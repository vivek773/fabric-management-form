import React from 'react';
import Select from 'react-select';

const SearchableDropdown = ({
  name,
  options,
  value,
  onChange,
  placeholder = 'Search...',
  isMulti = false,
  error,
}: any) => {
  return (
    <div className="space-y-2">
      <Select
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isMulti={isMulti}
        isSearchable={true}
        className="react-select-container"
        classNamePrefix="react-select"
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default SearchableDropdown;
