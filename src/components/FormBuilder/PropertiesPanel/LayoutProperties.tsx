import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { FormField } from '@/types/FormField';
import { Select } from '@/components/UI/Select';

interface LayoutPropertiesProps {
  field: FormField;
  isExpanded: boolean;
  onToggle: () => void;
  onUpdate: (id: string, updates: Partial<FormField>) => void;
}

export const LayoutProperties: React.FC<LayoutPropertiesProps> = ({
//   field,
  isExpanded,
  onToggle,
//   onUpdate
}) => {
  return (
    <div className="border-b border-gray-200">
      <button 
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors" 
        onClick={onToggle}
      >
        <span className="font-medium text-gray-700">Layout</span>
        {isExpanded ? 
          <ChevronDown className="w-4 h-4" /> : 
          <ChevronRight className="w-4 h-4" />
        }
      </button>
      
      {isExpanded && (
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Select
              label="Columns"
              value="auto"
              onChange={() => {}}
              options={[
                { value: 'auto', label: 'Auto' },
                { value: '1', label: '1' },
                { value: '2', label: '2' },
                { value: '3', label: '3' },
                { value: '4', label: '4' }
              ]}
            />
            <Select
              label="Size"
              value="auto"
              onChange={() => {}}
              options={[
                { value: 'auto', label: 'Auto' },
                { value: 'small', label: 'Small' },
                { value: 'medium', label: 'Medium' },
                { value: 'large', label: 'Large' }
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
};
