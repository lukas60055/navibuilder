type Variant = 'primary' | 'secondary';

export type ButtonProps = {
  variant?: Variant;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  children: string | JSX.Element;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
