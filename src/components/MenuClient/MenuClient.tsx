'use client';
import { useMemo } from 'react';
import {
  useSensor,
  useSensors,
  closestCenter,
  PointerSensor,
  DndContext,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useMenuContext } from '@/contexts/MenuContext';
import EmptyMenu from '@/components/EmptyMenu/EmptyMenu';
import FormMenu from '@/components/FormMenu/FormMenu';
import ContentMenu from '@/components/ContentMenu/ContentMenu';
import ItemMenu from '@/components/ItemMenu/ItemMenu';

const MenuClient = () => {
  const {
    menuItems,
    activeId,
    openFormMenuState,
    indentationWidth,
    flattenedItems,
    projected,
    handleDragStart,
    handleDragMove,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,
  } = useMenuContext();

  const isAddingNew =
    openFormMenuState?.mode === 'add' &&
    !openFormMenuState.parentId &&
    !openFormMenuState.itemId;

  const sensors = useSensors(useSensor(PointerSensor));

  const sortedIds = useMemo(
    () => flattenedItems.map(({ id }) => id),
    [flattenedItems]
  );
  const activeItem = activeId
    ? flattenedItems.find(({ id }) => id === activeId)
    : null;

  return (
    <>
      {menuItems.length === 0 && !isAddingNew && <EmptyMenu />}
      {menuItems.length === 0 && isAddingNew && <FormMenu />}
      {menuItems.length > 0 && (
        <ContentMenu>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <SortableContext
              items={sortedIds}
              strategy={verticalListSortingStrategy}
            >
              {flattenedItems.map(({ id, name, url, depth }) => (
                <ItemMenu
                  key={id}
                  id={id}
                  name={name}
                  url={url}
                  depth={id === activeId && projected ? projected.depth : depth}
                  indentationWidth={indentationWidth}
                />
              ))}
              <DragOverlay>
                {activeId && activeItem && (
                  <ItemMenu
                    id={activeId}
                    name={activeItem.name}
                    url={activeItem.url}
                    depth={activeItem.depth}
                    clone
                    indentationWidth={indentationWidth}
                  />
                )}
              </DragOverlay>
            </SortableContext>
          </DndContext>
        </ContentMenu>
      )}
    </>
  );
};

export default MenuClient;
