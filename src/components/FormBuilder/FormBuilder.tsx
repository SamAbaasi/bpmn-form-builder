// src/components/FormBuilder/FormBuilder.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useState } from 'react';
import { ComponentPalette } from './ComponentPalette/ComponentPalette';
import { FormCanvas } from './Canvas/FormCanvas';
import { PropertiesPanel } from './PropertiesPanel/PropertiesPanel';
import { Toolbar } from './Toolbar/Toolbar';
import { DragPreview } from './Canvas/DragPreview';
import { useFormFields } from '@/hooks/useFormFields';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { exportToJSON, exportToHTML } from '@/utils/validation';
import { Eye, X } from 'lucide-react';

// Form Preview Component
const FormPreview: React.FC<{
  fields: any[];
  isOpen: boolean;
  onClose: () => void;
}> = ({ fields, isOpen, onClose }) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  if (!isOpen) return null;

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    alert('Form submitted! Check console for data.');
    console.log('Form Data:', formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center space-x-2">
            <Eye className="w-5 h-5" />
            <span>Form Preview</span>
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Generated Form</h1>
            <p className="text-gray-600 mb-6">Form preview and testing.</p>
            
            {fields
              .sort((a, b) => a.y - b.y)
              .map(field => {
                switch (field.type) {
                  case 'textfield':
                    return (
                      <div key={field.id} className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {field.label}
                          {field.required && <span className="text-red-500">*</span>}
                        </label>
                        <input
                          type="text"
                          placeholder={field.placeholder}
                          value={formData[field.key] || ''}
                          onChange={(e) => handleInputChange(field.key, e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    );
                  case 'checkbox':
                    return (
                      <div key={field.id} className="mb-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData[field.key] || false}
                            onChange={(e) => handleInputChange(field.key, e.target.checked)}
                            className="mr-2"
                          />
                          {field.label}
                        </label>
                      </div>
                    );
                  case 'select':
                    return (
                      <div key={field.id} className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {field.label}
                          {field.required && <span className="text-red-500">*</span>}
                        </label>
                        <select
                          value={formData[field.key] || ''}
                          onChange={(e) => handleInputChange(field.key, e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                        >
                          <option value="">Select an option</option>
                          {field.options?.map((option: string, index: number) => (
                            <option key={index} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Submit Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FormBuilderProps {
  initialFields?: any[];
  onSave?: (fields: any[]) => void;
  onExport?: (fields: any[]) => void;
  readOnly?: boolean;
}

const FormBuilder: React.FC<FormBuilderProps> = ({ 
  initialFields = [], 
  onSave, 
  onExport,
  readOnly = false 
}) => {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const {
    formFields,
    selectedField,
    setSelectedField,
    addField,
    updateField,
    moveField,
    deleteField,
    duplicateField,
    clearForm,
    saveForm,
    undo,
    redo,
    canUndo,
    canRedo
  } = useFormFields({ initialFields, onSave });

  const {
    dragState,
    dragPreviewRef,
    startNewComponentDrag,
    startExistingFieldDrag
  } = useDragAndDrop({
    onFieldAdd: addField,
    onFieldMove: moveField,
    canvasRef
  });

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        exportToJSON(formFields);
      } else if (e.key === 'Delete' && selectedField) {
        deleteField(selectedField.id);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, selectedField, formFields, deleteField]);

  const handleSave = () => {
    saveForm();
    if (onSave) {
      onSave(formFields);
    }
  };

  const handleExport = () => {
    exportToHTML(formFields);
    if (onExport) {
      onExport(formFields);
    }
  };

  if (readOnly) {
    return (
      <div className="h-screen flex bg-gray-100">
        <FormCanvas
          fields={formFields}
          selectedField={null}
          dragState={{ isDragging: false, dragType: null }}
          onFieldSelect={() => {}}
          onFieldDrag={() => {}}
          canvasRef={canvasRef}
          readOnly={true}
        />
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-100 select-none">
      {/* Drag Preview */}
      <DragPreview dragState={dragState} dragPreviewRef={dragPreviewRef} />

      {/* Component Palette */}
      <ComponentPalette
        onComponentDrag={startNewComponentDrag}
        onComponentAdd={(componentType) => addField(componentType, { x: 100, y: 100 })}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <Toolbar
          selectedField={selectedField}
          onSave={handleSave}
          onExport={handleExport}
          onDelete={() => selectedField && deleteField(selectedField.id)}
          onDuplicate={() => selectedField && duplicateField(selectedField.id)}
          onClear={clearForm}
          onPreview={() => setShowPreview(true)}
          onUndo={undo}
          onRedo={redo}
          canUndo={canUndo}
          canRedo={canRedo}
          fieldsCount={formFields.length}
        />

        {/* Canvas */}
        <FormCanvas
          fields={formFields}
          selectedField={selectedField}
          dragState={dragState}
          onFieldSelect={setSelectedField}
          onFieldDrag={startExistingFieldDrag}
          canvasRef={canvasRef}
        />
      </div>

      {/* Properties Panel */}
      <PropertiesPanel
        selectedField={selectedField}
        onFieldUpdate={updateField}
      />

      {/* Form Preview Modal */}
      <FormPreview
        fields={formFields}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </div>
  );
};

export default FormBuilder;