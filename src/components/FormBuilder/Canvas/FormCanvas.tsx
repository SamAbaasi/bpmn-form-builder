// src/components/FormBuilder/Canvas/FormCanvas.tsx
import React from 'react';
import { Plus } from 'lucide-react';
import { FormField } from './FormField';
import { DropZone } from './DropZone';
import { FormField as FormFieldType } from '@/types/FormField';
import { DragState } from '@/types/DragState';
import { CANVAS_CONFIG } from '@/constants/componentTypes';

interface FormCanvasProps {
  fields: FormFieldType[];
  selectedField: FormFieldType | null;
  dragState: DragState;
  onFieldSelect: (field: FormFieldType) => void;
  onFieldDrag: (e: React.MouseEvent, field: FormFieldType) => void;
  canvasRef: React.RefObject<HTMLDivElement | null>;
  readOnly?: boolean;
}

export const FormCanvas: React.FC<FormCanvasProps> = ({
  fields,
  selectedField,
  dragState,
  onFieldSelect,
  onFieldDrag,
  canvasRef,
  readOnly = false
}) => {
  return (
    <div className="flex-1 bg-gray-50 relative overflow-auto">
      <div className="absolute inset-0">
        <div 
          ref={canvasRef}
          className={`bg-white mx-auto my-8 shadow-lg min-h-96 relative rounded-lg ${
            dragState.isDragging && dragState.dragType === 'new' ? 'ring-2 ring-blue-300 ring-opacity-50' : ''
          }`} 
          style={{ width: `${CANVAS_CONFIG.width}px`, minHeight: `${CANVAS_CONFIG.minHeight}px` }}
        >
          {/* Form Header */}
          <div className="p-6 border-b border-gray-200 rounded-t-lg">
            <h1 className="text-2xl font-bold text-gray-900">Form Builder Pro</h1>
            <p className="text-gray-600 mt-1">Design your forms with drag and drop.</p>
          </div>
          
          {/* Form Fields Container */}
          <div className="relative" style={{ minHeight: `${CANVAS_CONFIG.minHeight - 120}px` }}>
            {fields.map(field => (
              <FormField
                key={field.id}
                field={field}
                isSelected={selectedField?.id === field.id}
                isDragging={dragState.isDragging && dragState.fieldId === field.id}
                onSelect={onFieldSelect}
                onDrag={onFieldDrag}
                readOnly={readOnly}
              />
            ))}
            
            {/* Empty State */}
            {fields.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Plus className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p className="text-lg">Drag components here to start building</p>
                  <p className="text-sm">Or click on components in the left panel</p>
                </div>
              </div>
            )}
            
            {/* Drop Zone */}
            {dragState.isDragging && dragState.dragType === 'new' && !readOnly && (
              <DropZone />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};