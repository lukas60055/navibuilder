'use client';
import React, {
  useMemo,
  useContext,
  useState,
  createContext,
  ReactNode,
} from 'react';
import {
  DragStartEvent,
  DragMoveEvent,
  DragOverEvent,
  DragEndEvent,
  UniqueIdentifier,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import {
  MenuItemType,
  MenuContextProps,
  OpenFormMenuType,
} from '@/types/contexts/MenuContext/MenuContext';
import { FlattenedItem } from '@/types/utils/dragUtils';
import {
  buildTree,
  flattenTree,
  getProjection,
  removeChildrenOf,
} from '@/utils/dragUtils';

const MenuContext = createContext<MenuContextProps | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [nextId, setNextId] = useState(1);
  const [activeId, setActiveId] = useState<UniqueIdentifier>();
  const [overId, setOverId] = useState<UniqueIdentifier>();
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [openFormMenuState, setOpenFormMenuState] =
    useState<OpenFormMenuType>();

  const indentationWidth = 64;

  const openFormMenu = (options: OpenFormMenuType) =>
    setOpenFormMenuState(options);

  const closeFormMenu = () => setOpenFormMenuState(undefined);

  const addMenuItem = (
    item: Omit<MenuItemType, 'id' | 'children'>,
    parentId?: UniqueIdentifier
  ) => {
    const newItem: MenuItemType = { id: nextId, ...item, children: [] };
    setNextId((id) => id + 1);
    setMenuItems((items) =>
      parentId
        ? updateTree(items, parentId, (parent) => ({
            ...parent,
            children: [...(parent.children || []), newItem],
          }))
        : [...items, newItem]
    );
    closeFormMenu();
  };

  const updateMenuItem = (
    id: UniqueIdentifier,
    newData: Partial<Omit<MenuItemType, 'id' | 'children'>>
  ) => {
    setMenuItems((items) =>
      updateTree(items, id, (item) => ({ ...item, ...newData }))
    );
    closeFormMenu();
  };

  const removeMenuItem = (id: UniqueIdentifier) => {
    const removeItemFromTree = (items: MenuItemType[]): MenuItemType[] =>
      items
        .filter((item) => item.id !== id)
        .map((item) => ({
          ...item,
          children: item.children
            ? removeItemFromTree(item.children)
            : item.children,
        }));

    setMenuItems((items) => removeItemFromTree(items));
    closeFormMenu();
  };

  const updateTree = (
    items: MenuItemType[],
    id: UniqueIdentifier,
    updater: (item: MenuItemType) => MenuItemType
  ): MenuItemType[] =>
    items.map((item) =>
      item.id === id
        ? updater(item)
        : {
            ...item,
            children: item.children
              ? updateTree(item.children, id, updater)
              : item.children,
          }
    );

  const flattenedItems = useMemo(() => {
    const flattenedTree = flattenTree(menuItems);
    return removeChildrenOf(flattenedTree, activeId ? [activeId] : []);
  }, [activeId, menuItems]);

  const projected =
    activeId && overId
      ? getProjection(
          flattenedItems,
          activeId,
          overId,
          offsetLeft,
          indentationWidth
        )
      : undefined;

  const handleDragStart = ({ active: { id } }: DragStartEvent) => {
    setActiveId(id);
    setOverId(id);
    document.body.style.cursor = 'grabbing';
  };

  const handleDragMove = ({ delta }: DragMoveEvent) => {
    setOffsetLeft(delta.x);
  };

  const handleDragOver = ({ over }: DragOverEvent) => {
    setOverId(over?.id ?? undefined);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    resetState();

    if (projected && over) {
      const { depth, parentId } = projected;
      const clonedItems: FlattenedItem[] = JSON.parse(
        JSON.stringify(flattenTree(menuItems))
      );
      const overIndex = clonedItems.findIndex(({ id }) => id === over.id);
      const activeIndex = clonedItems.findIndex(({ id }) => id === active.id);
      const activeTreeItem = clonedItems[activeIndex];

      clonedItems[activeIndex] = { ...activeTreeItem, depth, parentId };

      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);
      setMenuItems(buildTree(sortedItems));
    }
  };

  const handleDragCancel = () => resetState();

  const resetState = () => {
    setOverId(undefined);
    setActiveId(undefined);
    setOffsetLeft(0);
    document.body.style.cursor = '';
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        activeId,
        addMenuItem,
        updateMenuItem,
        removeMenuItem,
        openFormMenu,
        closeFormMenu,
        openFormMenuState,
        indentationWidth,
        flattenedItems,
        projected,
        handleDragStart,
        handleDragMove,
        handleDragOver,
        handleDragEnd,
        handleDragCancel,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenuContext must be used within a MenuProvider');
  }
  return context;
};
