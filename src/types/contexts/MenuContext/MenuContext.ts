import { UniqueIdentifier } from '@dnd-kit/core';

export type MenuItemType = {
  id: UniqueIdentifier;
  name: string;
  url?: string;
  children: MenuItemType[];
};
