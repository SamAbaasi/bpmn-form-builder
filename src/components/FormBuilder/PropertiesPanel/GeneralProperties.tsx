import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { FormField } from '@/types/FormField';
import { Input } from '@/components/UI/Input';
import { Textarea } from '@/components/UI/Textarea';
import { Toggle } from '@/components/UI/Toggle';

interface GeneralPropertiesProps {
  field: FormField;
  isExpanded: boolean;
  onToggle: () => void;
  onUpdate: (id: string, updates: Partial<FormField>) => void;
}

export const GeneralProperties: React.FC<GeneralPropertiesProps> = ({
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
        <span className="font-medium text-gray-700">General</span>
        {isExpanded ? 
          <ChevronDown className="w-4 h-4" /> : 
          <ChevronRight className="w-4 h-4" />
        }
      </button>
      
      {isExpanded && (
        <div className="p-4 space-y-4">
          <Input
            label="Field label"
            value={field.label}
            onChange={(value) => onUpdate(field.id, { label: value })}
            required
          />
          
          <Textarea
            label="Field description"
            value={field.description || ''}
            onChange={(value) => onUpdate(field.id, { description: value })}
            rows={2}
          />
          
          <Input
            label="Key"
            value={field.key}
            onChange={(value) => onUpdate(field.id, { key: value })}
            helpText="Binds to a form variable"
          />

          {field.type === 'textfield' && (
            <Input
              label="Placeholder"
              value={field.placeholder || ''}
              onChange={(value) => onUpdate(field.id, { placeholder: value })}
            />
          )}
          
          <Toggle
            label="Disabled"
            checked={field.disabled || false}
            onChange={(checked) => onUpdate(field.id, { disabled: checked })}
          />
          
          <Toggle
            label="Read only"
            checked={field.readOnly || false}
            onChange={(checked) => onUpdate(field.id, { readOnly: checked })}
          />

          {/* Position Controls */}
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="X Position"
              type="number"
              value={field.x.toString()}
              onChange={(value) => onUpdate(field.id, { x: parseInt(value) || 0 })}
            />
            <Input
              label="Y Position"
              type="number"
              value={field.y.toString()}
              onChange={(value) => onUpdate(field.id, { y: parseInt(value) || 0 })}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Width"
              type="number"
              value={field.width.toString()}
              onChange={(value) => onUpdate(field.id, { width: parseInt(value) || 100 })}
            />
            <Input
              label="Height"
              type="number"
              value={field.height.toString()}
              onChange={(value) => onUpdate(field.id, { height: parseInt(value) || 40 })}
            />
          </div>
        </div>
      )}
    </div>
  );
};