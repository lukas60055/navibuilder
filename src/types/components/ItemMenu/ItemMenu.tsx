import { MenuItemType } from '@/types/contexts/MenuContext/MenuContext';

export type ItemMenuProps = Omit<MenuItemType, 'children'> & {
  clone?: boolean;
  depth: number;
  indentationWidth: number;
};
