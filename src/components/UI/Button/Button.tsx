'use client';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { ButtonProps } from '@/types/components/UI/Button/Button';

const Button = ({
  type,
  variant = 'secondary',
  className,
  onClick,
  children,
}: ButtonProps) => {
  const baseClasses =
    'min-h-10 px-3.5 py-2.5 outline outline-1 rounded-lg shadow-sm transition text-sm font-semibold';
  const primaryClasses =
    'flex flex-row justify-center items-center gap-1 text-white bg-[#7e56d8] outline-[#7e56d8] hover:bg-[#6936b8] hover:outline-[#6936b8]';
  const secondaryClasses =
    'bg-white text-[#344054] outline-[#d0d5dd] hover:text-[#6840c6] hover:outline-[#d6bbfb]';

  const variantClasses =
    variant === 'primary' ? primaryClasses : secondaryClasses;

  const finalClasses = [baseClasses, variantClasses, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={finalClasses} onClick={onClick} tabIndex={0}>
      {variant === 'primary' && (
        <PlusCircleIcon className="h-5 w-5" strokeWidth={1.67} />
      )}
      <div className="px-0.5">{children}</div>
    </button>
  );
};

export default Button;
