import React, { useState, useId } from 'react';

interface FloatingLabelInputProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  placeholder?: string;
  name?: string;
  id?: string;
  hasError?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Input: React.FC<FloatingLabelInputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  required = false,
  disabled = false,
  className = '',
  inputClassName = '',
  labelClassName = '',
  placeholder = ' ',
  name = '',
  id: propId,
  hasError = false,
  onBlur,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const generatedId = useId();
  const id = propId || generatedId;

  const isFloating = value.length > 0 || isFocused;

  // For password type, use the actual type but don't modify the value
  const inputType = type === 'password' ? 'password' : type;

  return (
    <div className={`relative ${className}`}>
      <input
        id={id}
        type={inputType}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        name={name}
        className={`
          block w-full px-4 pt-5 pb-2 text-sm text-[#0B2253] bg-white border rounded 
          appearance-none focus:outline-none focus:border-[#0A74DC] peer
          disabled:bg-gray-100 disabled:cursor-not-allowed transition duration-200
          ${hasError ? 'border-red-500' : 'border-gray-300'}
          ${inputClassName}
        `}
        placeholder={placeholder}
      />
      <label
        htmlFor={id}
        className={`
          absolute left-4 text-gray-500 text-sm duration-200 transform origin-top-left
          pointer-events-none transition-all ease-out bg-white px-1
          ${
            isFloating
              ? '-top-1.5 -translate-y-0 text-xs text-[#B0B9C8] font-medium'
              : 'top-1/2 -translate-y-1/2 text-sm'
          }
          ${hasError ? 'text-red-500' : ''}
          ${labelClassName}
        `}
      >
        {label}
        {required && ' *'}
      </label>
    </div>
  );
};

export default Input;
