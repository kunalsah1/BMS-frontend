import React from "react";
interface options {
  id: number | string;
  label: string;
}

interface SelectFieldsProps {
  label?: string;
  name?: string;
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: Array<options>;
}

const SelectField: React.FC<SelectFieldsProps> = ({
  label,
  value,
  onChange,
  options = [],
  name,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="" className="font-medium">
        {label}
      </label>
      <select
        name={name}
        id=""
        className="border-b p-1 bg-transparent outline-none text-black bg-gray-100"
        value={value}
        onChange={onChange}
      >
        <option value="">{label}</option>
        {options?.map((option) => (
          <option value={option.id} key={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
