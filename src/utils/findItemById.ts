import { MenuItemType } from '@/types/contexts/MenuContext/MenuContext';

export const findItemById = (
  items: MenuItemType[],
  id: MenuItemType['id']
): MenuItemType | undefined => {
  for (const item of items) {
    if (item.id === id) return item;
    const found = item.children && findItemById(item.children, id);
    if (found) return found;
  }
  return undefined;
};
