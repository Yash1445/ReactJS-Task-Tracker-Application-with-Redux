import { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className, ...props }: Props) => (
  <input
    className={clsx('w-full rounded-lg border border-slate-300 px-3 py-2 text-sm', className)}
    {...props}
  />
);