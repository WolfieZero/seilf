import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLFormElement> {
  label?: string;
  help?: string;
  placeholder?: string;
}

export const Field = ({ label, help, children }: Props): JSX.Element => (
  <label className="relative mb-4">
    {label && <div className="text-l font-nromal cursor-pointer font-light leading-7 text-slate-600">{label}</div>}
    {children}
    {help && <p className="mt-0.5 text-xs font-extralight text-slate-500">{help}</p>}
  </label>
);
