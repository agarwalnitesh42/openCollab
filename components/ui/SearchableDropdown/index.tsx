import React from 'react';
import Select from 'react-select';
import mergeTW from '@/utils/mergeTW';

export const SearchableDropdown = ({ value, options, placeholder, className, containerClass, ...props }) => {
  const selectedOption = options.find((option) => option.value === value);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#f9fafb', // Change the background color
      borderColor: '#4a5568', // Change the border color
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#1d1e1f', // Change the text color
      fontSize: '14px',
    }),
  };

  return (
    <Select
      {...props}
      className={mergeTW(
        `text-black text-sm ${className}`,
      )}
      classNamePrefix="react-select"
      options={options}
      value={selectedOption}
      isSearchable
      placeholder={placeholder}
      styles={customStyles}
    />
  );
};

export default SearchableDropdown;