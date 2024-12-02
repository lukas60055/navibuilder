import { InputProps } from '@/types/components/UI/Input/Input';

const Input = ({
  name,
  label,
  placeholder,
  icon: Icon,
  errors,
  register,
  validationSchema,
}: InputProps) => {
  const registrationOptions = {
    ...validationSchema,
    required:
      validationSchema?.required === true
        ? 'Pole wymagane'
        : validationSchema?.required,
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-[#344054] text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#667085]" />
        )}
        <input
          id={name}
          placeholder={placeholder}
          className={`w-full ${
            Icon ? 'pl-10' : 'pl-3'
          } px-3 py-2 bg-white rounded-lg shadow outline outline-1 outline-[#d0d5dd] text-[#667085]`}
          {...register(
            name,
            validationSchema ? registrationOptions : undefined
          )}
        />
      </div>
      {errors[name] && (
        <span className="text-red-500 text-sm">
          {errors[name].message?.toString()}
        </span>
      )}
    </div>
  );
};

export default Input;
