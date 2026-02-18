import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
};

export const Button = ({ className, variant = 'primary', ...props }: Props) => (
  <button
    className={clsx(
      'rounded-lg px-3 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50',
      {
        'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
        'bg-slate-100 text-slate-700 hover:bg-slate-200': variant === 'secondary',
        'bg-red-600 text-white hover:bg-red-700': variant === 'danger'
      },
      className
    )}
    {...props}
  />
);