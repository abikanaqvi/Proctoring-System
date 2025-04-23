import React from 'react';
import './commoninput.css';

const CommonInput = ({
  placeholderText = 'Input',
  value = '',
  onChange,
  name,
  type = 'text',
  required = false,
  className = '',
  ...rest
}) => {
  return (
    <input
      type={type}
      placeholder={placeholderText}
      value={value}
      onChange={onChange}
      name={name}
      required={required}
      className={`common-input ${className}`}
      {...rest}
    />
  );
};

export default CommonInput;
