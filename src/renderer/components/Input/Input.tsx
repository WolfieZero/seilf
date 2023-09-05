import { InputHTMLAttributes } from 'react';

export const Input = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className="w-full rounded border border-slate-600 px-4 py-2 text-sm text-slate-600" />
);
