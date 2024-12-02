import type { UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { FlattenedItem } from '@/types/utils/dragUtils';
import { MenuItemType } from '@/types/contexts/MenuContext/MenuContext';

const getDragDepth = (offset: number, indentationWidth: number) => {
  return Math.round(offset / indentationWidth);
};

export const getProjection = (
  items: FlattenedItem[],
  activeId: UniqueIdentifier,
  overId: UniqueIdentifier,
  dragOffset: number,
  indentationWidth: number
) => {
  const overItemIndex = items.findIndex(({ id }) => id === overId);
  const activeItemIndex = items.findIndex(({ id }) => id === activeId);
  const activeItem = items[activeItemIndex];
  const reorderedItems = arrayMove(items, activeItemIndex, overItemIndex);
  const previousItem = reorderedItems[overItemIndex - 1];
  const nextItem = reorderedItems[overItemIndex + 1];

  const projectedDepth = calculateProjectedDepth(
    activeItem.depth,
    dragOffset,
    indentationWidth,
    previousItem,
    nextItem
  );

  return {
    depth: projectedDepth.depth,
    parentId: getParentId(
      reorderedItems,
      projectedDepth.depth,
      previousItem,
      overItemIndex
    ),
  };
};

const calculateProjectedDepth = (
  currentDepth: number,
  dragOffset: number,
  indentationWidth: number,
  previousItem?: FlattenedItem,
  nextItem?: FlattenedItem
) => {
  const dragDepth = getDragDepth(dragOffset, indentationWidth);
  const projectedDepth = currentDepth + dragDepth;
  const maxDepth = previousItem ? previousItem.depth + 1 : 0;
  const minDepth = nextItem ? nextItem.depth : 0;

  return {
    depth: Math.max(minDepth, Math.min(projectedDepth, maxDepth)),
  };
};

const getParentId = (
  items: FlattenedItem[],
  depth: number,
  previousItem: FlattenedItem | undefined,
  overItemIndex: number
) => {
  if (!previousItem || depth === 0) return null;

  if (depth === previousItem.depth) return previousItem.parentId;
  if (depth > previousItem.depth) return previousItem.id;

  return (
    items
      .slice(0, overItemIndex)
      .reverse()
      .find((item) => item.depth === depth)?.parentId ?? null
  );
};

const flatten = (
  items: MenuItemType[],
  parentId: UniqueIdentifier | null = null,
  depth = 0
): FlattenedItem[] => {
  return items.reduce<FlattenedItem[]>(
    (acc, item, index) => [
      ...acc,
      { ...item, parentId, depth, index },
      ...flatten(item.children, item.id, depth + 1),
    ],
    []
  );
};

export const flattenTree = (items: MenuItemType[]) => {
  return flatten(items);
};

export const buildTree = (flattenedItems: FlattenedItem[]) => {
  const root: MenuItemType = { id: 'root', children: [], name: 'root' };
  const nodes: Record<string, MenuItemType> = { [root.id]: root };
  const items = flattenedItems.map((item) => ({ ...item, children: [] }));

  for (const item of items) {
    const parentId = item.parentId ?? root.id;
    const parent = nodes[parentId] ?? findItem(items, parentId);
    parent.children.push(item);
    nodes[item.id] = item;
  }

  return root.children;
};

export const findItem = (items: MenuItemType[], itemId: UniqueIdentifier) => {
  return items.find(({ id }) => id === itemId);
};

export const findItemDeep = (
  items: MenuItemType[],
  itemId: UniqueIdentifier
): MenuItemType | undefined => {
  for (const item of items) {
    if (item.id === itemId) return item;
    if (item.children.length) {
      const found = findItemDeep(item.children, itemId);
      if (found) return found;
    }
  }
  return undefined;
};

export const removeChildrenOf = (
  items: FlattenedItem[],
  ids: UniqueIdentifier[]
) => {
  const excludeParentIds = [...ids];

  return items.filter((item) => {
    if (item.parentId && excludeParentIds.includes(item.parentId)) {
      if (item.children.length) excludeParentIds.push(item.id);
      return false;
    }
    return true;
  });
};
