import { useMenuContext } from '@/contexts/MenuContext';
import FormMenu from '@/components/FormMenu/FormMenu';
import Button from '@/components/UI/Button/Button';
import { ContentMenuProps } from '@/types/components/ContentMenu/ContentMenu';

const ContentMenu = ({ children }: ContentMenuProps) => {
  const { openFormMenuState, openFormMenu } = useMenuContext();

  const handleAddClick = () => {
    openFormMenu({ mode: 'add' });
  };

  const isAddingNew =
    openFormMenuState?.mode === 'add' &&
    !openFormMenuState.parentId &&
    !openFormMenuState.itemId;

  return (
    <div className="flex flex-col border border-[#d0d5dd] rounded-lg overflow-hidden">
      <div className="bg-gray-50">
        {children}
        {isAddingNew && (
          <div className="px-6 py-4 border-b border-[#eaecf0]">
            <FormMenu />
          </div>
        )}
      </div>
      <div className="px-6 py-5">
        <Button onClick={handleAddClick}>Dodaj pozycję menu</Button>
      </div>
    </div>
  );
};

export default ContentMenu;
