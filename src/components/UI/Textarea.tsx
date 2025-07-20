import React from 'react';
import clsx from 'clsx';

interface TextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  helpText?: string;
  className?: string;
  disabled?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
  helpText,
  className = '',
  disabled = false
}) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={clsx(
          "w-full border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
          disabled && "bg-gray-100 cursor-not-allowed"
        )}
      />
      {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
    </div>
  );
};