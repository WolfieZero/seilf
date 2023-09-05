// eslint-disable jsx-a11y/no-static-element-interactions
import { KeyboardEvent, useState, InputHTMLAttributes, ChangeEvent } from 'react';

export const InputFile = ({ name, onChange, ...props }: InputHTMLAttributes<HTMLInputElement>): JSX.Element => {
  const [filePath, setFilePath] = useState(props.defaultValue);
  const displayValue = filePath === '' ? props.defaultValue : filePath;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFilePath(event.target.files[0].path);
    }

    if (onChange) {
      onChange(event);
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    const target = event.target as HTMLDivElement;
    const input = target.querySelector('input');
    if (event.key === 'Enter' && input) {
      input.click();
    }
  };

  return (
    <div
      tabIndex={0}
      role="button"
      onKeyUp={handleKeyUp}
      className="group relative flex w-full cursor-pointer items-stretch overflow-hidden rounded border border-slate-600"
    >
      <input
        tabIndex={-1}
        className="absolute hidden opacity-0"
        type="file"
        name={name}
        onChange={handleChange}
        {...props}
      />
      <span className="whitespace-nowrap bg-slate-500 px-4 py-2 text-sm font-light text-white group-hover:bg-slate-700 group-focus:bg-slate-700">
        File
      </span>
      <span className="overflow-hidden text-ellipsis whitespace-nowrap px-4 py-2 text-sm font-extralight text-slate-600">
        {displayValue}
      </span>
    </div>
  );
};
