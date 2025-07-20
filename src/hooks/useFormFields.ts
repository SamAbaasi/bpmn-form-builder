// src/hooks/useFormFields.ts
import { useState, useCallback } from 'react';
import { FormField } from '@/types/FormField';
import { ComponentType } from '@/types/ComponentType';
import { Position } from '@/types/DragState';
import { useLocalStorage } from './useLocalStorage';

interface UseFormFieldsProps {
  initialFields?: FormField[];
  onSave?: (fields: FormField[]) => void;
}

export const useFormFields = ({ initialFields = [], onSave }: UseFormFieldsProps = {}) => {
  const [formFields, setFormFields] = useState<FormField[]>(initialFields);
  const [selectedField, setSelectedField] = useState<FormField | null>(null);
  const [history, setHistory] = useState<FormField[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Auto-save to localStorage
  const [, setStoredFields] = useLocalStorage('form-builder-fields', formFields);

  const saveToHistory = useCallback((fields: FormField[]) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push([...fields]);
      return newHistory.slice(-50); // Keep last 50 states
    });
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  const addField = useCallback((componentType: ComponentType, position: Position) => {
    const newField: FormField = {
      id: `${componentType.id}-${Date.now()}`,
      type: componentType.id,
      label: componentType.name,
      key: `${componentType.id}_${Math.random().toString(36).substr(2, 9)}`,
      x: position.x,
      y: position.y,
      ...componentType.defaultProps,
      // Ensure required fields are always defined
      width: componentType.defaultProps.width ?? 200,
      height: componentType.defaultProps.height ?? 40
    };
    
    saveToHistory(formFields);
    setFormFields(prev => {
      const newFields = [...prev, newField];
      setStoredFields(newFields);
      return newFields;
    });
    setSelectedField(newField);
  }, [formFields, saveToHistory, setStoredFields]);

  const updateField = useCallback((id: string, updates: Partial<FormField>) => {
    setFormFields(prev => {
      const newFields = prev.map(field => field.id === id ? { ...field, ...updates } : field);
      setStoredFields(newFields);
      return newFields;
    });
    
    if (selectedField?.id === id) {
      setSelectedField(prev => prev ? { ...prev, ...updates } : null);
    }
  }, [selectedField, setStoredFields]);

  const moveField = useCallback((fieldId: string, position: Position) => {
    updateField(fieldId, { x: position.x, y: position.y });
  }, [updateField]);

  const deleteField = useCallback((id: string) => {
    saveToHistory(formFields);
    setFormFields(prev => {
      const newFields = prev.filter(field => field.id !== id);
      setStoredFields(newFields);
      return newFields;
    });
    if (selectedField?.id === id) {
      setSelectedField(null);
    }
  }, [formFields, selectedField, saveToHistory, setStoredFields]);

  const duplicateField = useCallback((id: string) => {
    const field = formFields.find(f => f.id === id);
    if (!field) return;

    const newField: FormField = {
      ...field,
      id: `${field.type}-${Date.now()}`,
      x: field.x + 20,
      y: field.y + 20,
      key: `${field.type}_${Math.random().toString(36).substr(2, 9)}`
    };

    saveToHistory(formFields);
    setFormFields(prev => {
      const newFields = [...prev, newField];
      setStoredFields(newFields);
      return newFields;
    });
    setSelectedField(newField);
  }, [formFields, saveToHistory, setStoredFields]);

  const clearForm = useCallback(() => {
    saveToHistory(formFields);
    setFormFields([]);
    setSelectedField(null);
    setStoredFields([]);
  }, [formFields, saveToHistory, setStoredFields]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      const prevFields = history[historyIndex - 1];
      setFormFields([...prevFields]);
      setStoredFields([...prevFields]);
    }
  }, [history, historyIndex, setStoredFields]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      const nextFields = history[historyIndex + 1];
      setFormFields([...nextFields]);
      setStoredFields([...nextFields]);
    }
  }, [history, historyIndex, setStoredFields]);

  const saveForm = useCallback(() => {
    if (onSave) {
      onSave(formFields);
    }
  }, [formFields, onSave]);

  return {
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
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1
  };
};