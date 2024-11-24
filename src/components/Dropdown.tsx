import React from 'react';
import Select from 'react-select';

const MultiSelectDropdown = ({
  name,
  options,
  value,
  onChange,
  placeholder = 'Select...',
  isMulti = true,
  error,
}: any) => {
  return (
    <div className="space-y-2">
      <Select
        isMulti={isMulti}
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="react-select-container"
        classNamePrefix="react-select"
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default MultiSelectDropdown;
