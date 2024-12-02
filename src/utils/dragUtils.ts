import type { UniqueIdentifier } from '@dnd-kit/core';
import { FlattenedItem } from '@/types/utils/dragUtils';
import { MenuItemType } from '@/types/contexts/MenuContext/MenuContext';

const getDragDepth = (offset: number, indentationWidth: number) => {
  return Math.round(offset / indentationWidth);
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
