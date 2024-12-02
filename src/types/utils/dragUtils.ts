import { UniqueIdentifier } from '@dnd-kit/core';
import { MenuItemType } from '@/types/contexts/MenuContext/MenuContext';

export type FlattenedItem = MenuItemType & {
  parentId: UniqueIdentifier | null;
  depth: number;
  index: number;
};
