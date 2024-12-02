import { FlattenedItem } from '@/types/utils/dragUtils';
import {
  DragStartEvent,
  DragMoveEvent,
  DragOverEvent,
  DragEndEvent,
  DragCancelEvent,
  UniqueIdentifier,
} from '@dnd-kit/core';

export type MenuItemType = {
  id: UniqueIdentifier;
  name: string;
  url?: string;
  children: MenuItemType[];
};

export type OpenFormMenuType = {
  mode: 'add' | 'edit';
  itemId?: MenuItemType['id'];
  parentId?: MenuItemType['id'];
};

export type MenuContextProps = {
  menuItems: MenuItemType[];
  activeId: MenuItemType['id'] | undefined;
  addMenuItem: (
    item: Omit<MenuItemType, 'id' | 'children'>,
    parentId?: MenuItemType['id']
  ) => void;
  updateMenuItem: (
    id: MenuItemType['id'],
    newData: Omit<MenuItemType, 'id' | 'children'>
  ) => void;
  removeMenuItem: (id: MenuItemType['id']) => void;
  openFormMenu: (options: OpenFormMenuType) => void;
  closeFormMenu: () => void;
  openFormMenuState: OpenFormMenuType | undefined;
  indentationWidth: number;
  flattenedItems: FlattenedItem[];
  projected: Pick<FlattenedItem, 'depth' | 'parentId'> | undefined;
  handleDragStart: (event: DragStartEvent) => void;
  handleDragMove: (event: DragMoveEvent) => void;
  handleDragOver: (event: DragOverEvent) => void;
  handleDragEnd: (event: DragEndEvent) => void;
  handleDragCancel: (event: DragCancelEvent) => void;
};
