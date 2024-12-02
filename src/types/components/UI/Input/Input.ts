import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

export type InputProps = {
  name: string;
  label: string;
  placeholder: string;
  icon?: React.ElementType;
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
  validationSchema?: RegisterOptions<FieldValues>;
};
