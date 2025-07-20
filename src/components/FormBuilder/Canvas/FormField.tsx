import React from 'react';
import { Image } from 'lucide-react';
import { FormField as FormFieldType } from '@/types/FormField';

interface FormFieldProps {
  field: FormFieldType;
  isSelected: boolean;
  isDragging: boolean;
  onSelect: (field: FormFieldType) => void;
  onDrag: (e: React.MouseEvent, field: FormFieldType) => void;
  readOnly?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  field,
  isSelected,
  isDragging,
  onSelect,
  onDrag,
  readOnly = false
}) => {
  const handleClick = () => {
    if (!readOnly) {
      onSelect(field);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!readOnly) {
      onDrag(e, field);
    }
  };

  const renderFieldContent = () => {
    switch (field.type) {
      case 'textfield':
        return (
          <div className="space-y-1">
            <label className="text-sm text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <input 
              type="text" 
              className="w-full border rounded px-2 py-1 text-sm"
              placeholder={field.placeholder || ''}
              disabled
            />
            {field.description && (
              <p className="text-xs text-gray-500">{field.description}</p>
            )}
          </div>
        );

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <input type="checkbox" disabled className="rounded" />
            <label className="text-sm text-gray-700">{field.label}</label>
          </div>
        );

      case 'checkboxGroup':
        return (
          <div className="space-y-1">
            <label className="text-sm text-gray-700">{field.label}</label>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <input type="checkbox" disabled className="rounded" />
                <label className="text-xs text-gray-600">Option 1</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" disabled className="rounded" />
                <label className="text-xs text-gray-600">Option 2</label>
              </div>
            </div>
          </div>
        );

      case 'radio':
        return (
          <div className="space-y-1">
            <label className="text-sm text-gray-700">{field.label}</label>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <input type="radio" disabled className="rounded-full" />
                <label className="text-xs text-gray-600">Option 1</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" disabled className="rounded-full" />
                <label className="text-xs text-gray-600">Option 2</label>
              </div>
            </div>
          </div>
        );

      case 'select':
        return (
          <div className="space-y-1">
            <label className="text-sm text-gray-700">{field.label}</label>
            <select className="w-full border rounded px-2 py-1 text-sm" disabled>
              <option>Select option...</option>
            </select>
          </div>
        );

      case 'taglist':
        return (
          <div className="space-y-1">
            <label className="text-sm text-gray-700">{field.label}</label>
            <div className="border rounded p-2 min-h-[40px] bg-gray-50 text-sm text-gray-500">
              Tag input area
            </div>
          </div>
        );

      case 'button':
        return (
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm h-full">
            {field.label}
          </button>
        );

      case 'textview':
        return (
          <div className="flex items-center h-full">
            <span className="text-sm text-gray-700">{field.label}</span>
          </div>
        );

      case 'imageview':
        return (
          <div className="flex items-center justify-center h-full bg-gray-100 border-2 border-dashed border-gray-300 rounded">
            <Image className="w-8 h-8 text-gray-400" />
          </div>
        );

      case 'table':
        return (
          <div className="h-full">
            <label className="text-sm text-gray-700 block mb-1">{field.label}</label>
            <div className="border rounded overflow-hidden bg-white text-xs h-full">
              <div className="bg-gray-100 px-2 py-1 border-b">
                <span className="font-medium">Sample Table</span>
              </div>
              <div className="px-2 py-1">
                <span>Table content</span>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-full bg-gray-100 border-2 border-dashed border-gray-300 rounded">
            <span className="text-sm text-gray-500">{field.label}</span>
          </div>
        );
    }
  };

  return (
    <div
      className={`absolute border-2 cursor-move transition-all duration-200 rounded ${
        isSelected ? 'border-blue-500 bg-blue-50 shadow-lg' : 'border-gray-300 hover:border-gray-400 bg-white'
      } ${isDragging ? 'opacity-50 z-50' : ''}`}
      style={{
        left: field.x,
        top: field.y,
        width: field.width,
        height: field.height
      }}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
    >
      <div className="p-2 h-full flex flex-col pointer-events-none">
        {renderFieldContent()}
      </div>
    </div>
  );
};