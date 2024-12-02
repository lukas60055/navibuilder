import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import { useMenuContext } from '@/contexts/MenuContext';
import FormMenu from '@/components/FormMenu/FormMenu';
import Button from '@/components/UI/Button/Button';
import { ItemMenuProps } from '@/types/components/ItemMenu/ItemMenu';

const ItemMenu = ({
  id,
  name,
  url,
  clone = false,
  depth,
  indentationWidth,
}: ItemMenuProps) => {
  const { removeMenuItem, openFormMenuState, openFormMenu } = useMenuContext();
  const { isDragging, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const sortableStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const marginLeft = clone ? undefined : `${indentationWidth * depth}px`;

  const handleRemove = () => {
    removeMenuItem(id);
  };

  const handleEdit = () => {
    openFormMenu({ mode: 'edit', itemId: id });
  };

  const handleAddSubItem = () => {
    openFormMenu({ mode: 'add', parentId: id });
  };

  const isFormOpenForThisItem =
    (openFormMenuState?.mode === 'edit' && openFormMenuState.itemId === id) ||
    (openFormMenuState?.mode === 'add' && openFormMenuState.parentId === id);

  return (
    <>
      <div
        ref={setNodeRef}
        className="flex flex-col md:flex-row items-center py-4 px-6 gap-4 md:gap-0 bg-white border-l border-b border-[#eaecf0]"
        style={{ marginLeft, ...sortableStyle }}
        {...listeners}
      >
        <div className="flex gap-1 grow">
          <div className="p-2.5 cursor-grab">
            <ArrowsPointingOutIcon
              className="w-5 h-5 text-[#475467] transform rotate-45"
              strokeWidth={1.67}
            />
          </div>
          <div className="flex flex-col justify-center gap-1.5">
            <p className="text-[#101828] text-sm font-semibold">{name}</p>
            <p className="text-[#475467] text-sm font-normal">{url}</p>
          </div>
        </div>
        <div className="flex" onPointerDown={(e) => e.stopPropagation()}>
          <Button className="rounded-r-none" onClick={handleRemove}>
            Usuń
          </Button>
          <Button className="rounded-none" onClick={handleEdit}>
            Edytuj
          </Button>
          <Button className="rounded-l-none" onClick={handleAddSubItem}>
            Dodaj pozycję menu
          </Button>
        </div>
      </div>
      {!clone && !isDragging && isFormOpenForThisItem && (
        <div
          style={{ marginLeft }}
          className="px-6 py-4 bg-gray-50 border-b border-[#eaecf0]"
        >
          <FormMenu />
        </div>
      )}
    </>
  );
};

export default ItemMenu;
