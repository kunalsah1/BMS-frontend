import React from "react";

interface TextFieldProps {
  label?: string;
  placeholder?: string;
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
  type?: string;
  readonly?: boolean;
}
const TextField: React.FC<TextFieldProps> = ({
  label,
  placeholder,
  value,
  name,
  onChange,
  disabled,
  maxLength,
  required,
  type = "text",
  readonly,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="" className="font-medium">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        id=""
        className="border-b p-1 bg-transparent outline-none"
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        required={required}
        readOnly={readonly}
      />
    </div>
  );
};

export default TextField;
