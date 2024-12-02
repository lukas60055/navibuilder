import { useMenuContext } from '@/contexts/MenuContext';
import Button from '@/components/UI/Button/Button';

const EmptyMenu = () => {
  const { openFormMenu } = useMenuContext();

  const handleAddClick = () => {
    openFormMenu({ mode: 'add' });
  };

  return (
    <div className="p-6 min-h-40 bg-[#f9fafb] border border-[#eaecf0] rounded-lg">
      <div className="flex flex-col gap-1">
        <div className="text-center text-[#101828] text-base font-semibold">
          Menu jest puste
        </div>
        <div className="text-center text-[#475467] text-sm font-normal">
          W tym menu nie ma jeszcze żadnych linków.
        </div>
      </div>
      <Button
        variant="primary"
        className="mt-6 mx-auto"
        onClick={handleAddClick}
      >
        Dodaj pozycję menu
      </Button>
    </div>
  );
};

export default EmptyMenu;
