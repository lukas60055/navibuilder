'use client';
import { useEffect } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useMenuContext } from '@/contexts/MenuContext';
import Input from '@/components/UI/Input/Input';
import Button from '@/components/UI/Button/Button';
import { findItemById } from '@/utils/findItemById';

const FormMenu = () => {
  const {
    menuItems,
    addMenuItem,
    updateMenuItem,
    removeMenuItem,
    openFormMenuState,
    closeFormMenu,
  } = useMenuContext();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (dataForm: FieldValues) => {
    if (openFormMenuState?.mode === 'edit' && openFormMenuState.itemId) {
      updateMenuItem(openFormMenuState.itemId, {
        name: dataForm.name,
        url: dataForm.url,
      });
    } else if (openFormMenuState?.mode === 'add') {
      addMenuItem(
        { name: dataForm.name, url: dataForm.url },
        openFormMenuState.parentId
      );
    }
    reset();
  };

  const handleRemove = () => {
    if (openFormMenuState?.itemId) {
      removeMenuItem(openFormMenuState.itemId);
    }
    reset();
  };

  useEffect(() => {
    reset();

    if (openFormMenuState?.mode === 'edit' && openFormMenuState.itemId) {
      const itemData = findItemById(menuItems, openFormMenuState.itemId);
      if (itemData) {
        setValue('name', itemData.name);
        setValue('url', itemData.url);
      }
    }
  }, [openFormMenuState, menuItems]);

  return (
    <form
      className="flex flex-col py-5 px-6 min-h-6 gap-5 bg-white border border-[#d0d5dd] rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex gap-4">
        <div className="flex flex-col grow gap-2">
          <Input
            name="name"
            label="Nazwa"
            placeholder="np. Promocje"
            register={register}
            errors={errors}
            validationSchema={{
              required: true,
            }}
          />
          <Input
            name="url"
            label="Link"
            placeholder="Wklej lub wyszukaj"
            icon={MagnifyingGlassIcon}
            register={register}
            errors={errors}
            validationSchema={{
              pattern: {
                value:
                  /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/,
                message: 'Nieprawidłowy URL',
              },
            }}
          />
        </div>
        {openFormMenuState?.mode === 'edit' && (
          <div className="flex items-start">
            <div className="p-2.5 cursor-pointer" onClick={handleRemove}>
              <TrashIcon
                className="w-5 h-5 text-[#475467]"
                strokeWidth={1.67}
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <Button type="button" onClick={closeFormMenu}>
          Anuluj
        </Button>
        <Button type="submit">
          {openFormMenuState?.mode === 'edit' ? 'Zapisz' : 'Dodaj'}
        </Button>
      </div>
    </form>
  );
};

export default FormMenu;
