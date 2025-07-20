import React from 'react';
import { ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { FormField } from '@/types/FormField';
import { Select } from '@/components/UI/Select';

interface OptionsPropertiesProps {
  field: FormField;
  isExpanded: boolean;
  onToggle: () => void;
  onUpdate: (id: string, updates: Partial<FormField>) => void;
}

export const OptionsProperties: React.FC<OptionsPropertiesProps> = ({
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
        <span className="font-medium text-gray-700">Options source</span>
        {isExpanded ? 
          <ChevronDown className="w-4 h-4" /> : 
          <ChevronRight className="w-4 h-4" />
        }
      </button>
      
      {isExpanded && (
        <div className="p-4">
          <Select
            label="Type"
            value="static"
            onChange={() => {}}
            options={[
              { value: 'static', label: 'Static' },
              { value: 'dynamic', label: 'Dynamic' }
            ]}
          />
          
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Static options</span>
              <button className="text-blue-600 hover:text-blue-700">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="bg-gray-50 rounded p-2 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <ChevronRight className="w-4 h-4" />
                <span>Value</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};