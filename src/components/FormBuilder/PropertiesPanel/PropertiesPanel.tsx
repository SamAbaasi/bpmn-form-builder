import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { GeneralProperties } from './GeneralProperties';
import { OptionsProperties } from './OptionsProperties';
import { ValidationProperties } from './ValidationProperties';
import { LayoutProperties } from './LayoutProperties';
import { FormField } from '@/types/FormField';

interface PropertiesPanelProps {
  selectedField: FormField | null;
  onFieldUpdate: (id: string, updates: Partial<FormField>) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedField,
  onFieldUpdate
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['general', 'validation', 'layout'])
  );

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const hasOptionsSource = selectedField && [
    'select', 'taglist', 'checkboxGroup', 'radio'
  ].includes(selectedField.type);

  return (
    <div className="w-80 bg-white border-l border-gray-300 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="font-semibold text-gray-800 flex items-center space-x-2">
          <Settings className="w-4 h-4" />
          <span>{selectedField ? selectedField.type.toUpperCase() : 'PROPERTIES'}</span>
        </h2>
      </div>
      
      {selectedField ? (
        <div className="flex-1 overflow-y-auto">
          {/* General Properties */}
          <GeneralProperties
            field={selectedField}
            isExpanded={expandedSections.has('general')}
            onToggle={() => toggleSection('general')}
            onUpdate={onFieldUpdate}
          />

          {/* Options Source */}
          {hasOptionsSource && (
            <OptionsProperties
              field={selectedField}
              isExpanded={expandedSections.has('options')}
              onToggle={() => toggleSection('options')}
              onUpdate={onFieldUpdate}
            />
          )}

          {/* Validation */}
          <ValidationProperties
            field={selectedField}
            isExpanded={expandedSections.has('validation')}
            onToggle={() => toggleSection('validation')}
            onUpdate={onFieldUpdate}
          />

          {/* Layout */}
          <LayoutProperties
            field={selectedField}
            isExpanded={expandedSections.has('layout')}
            onToggle={() => toggleSection('layout')}
            onUpdate={onFieldUpdate}
          />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <Settings className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Select a field to edit properties</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 text-center">
        <div className="text-xs text-gray-500">
          <span className="font-semibold">Form Builder Pro v1.0</span>
        </div>
        {selectedField && (
          <div className="text-xs text-gray-400 mt-1">
            ID: {selectedField.id}
          </div>
        )}
      </div>
    </div>
  );
};