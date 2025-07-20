import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { FormField } from '@/types/FormField';
import { Input } from '@/components/UI/Input';
import { Toggle } from '@/components/UI/Toggle';

interface ValidationPropertiesProps {
  field: FormField;
  isExpanded: boolean;
  onToggle: () => void;
  onUpdate: (id: string, updates: Partial<FormField>) => void;
}

export const ValidationProperties: React.FC<ValidationPropertiesProps> = ({
  field,
  isExpanded,
  onToggle,
  onUpdate
}) => {
  return (
    <div className="border-b border-gray-200">
      <button 
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors" 
        onClick={onToggle}
      >
        <span className="font-medium text-gray-700">Validation</span>
        {isExpanded ? 
          <ChevronDown className="w-4 h-4" /> : 
          <ChevronRight className="w-4 h-4" />
        }
      </button>
      
      {isExpanded && (
        <div className="p-4 space-y-4">
          <Toggle
            label="Required"
            checked={field.required || false}
            onChange={(checked) => onUpdate(field.id, { required: checked })}
          />
          
          <Input
            label="Validation pattern"
            value={field.validation || ''}
            onChange={(value) => onUpdate(field.id, { validation: value })}
            placeholder="Regular expression"
            helpText="Enter a regular expression for validation"
          />
        </div>
      )}
    </div>
  );
};