import React from 'react';
import { Undo, Redo, Trash2, Copy, RotateCcw, Save, Download, Eye } from 'lucide-react';
import { Button } from '@/components/UI/Button';
import { FormField } from '@/types/FormField';

interface ToolbarProps {
  selectedField: FormField | null;
  onSave: () => void;
  onExport: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onClear: () => void;
  onPreview: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  fieldsCount: number;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  selectedField,
  onSave,
  onExport,
  onDelete,
  onDuplicate,
  onClear,
  onPreview,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  fieldsCount
}) => {
  return (
    <div className="bg-white border-b border-gray-300 p-2 flex items-center space-x-2">
      {/* Undo/Redo */}
      <button 
        className="p-2 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onUndo}
        disabled={!canUndo}
        title="Undo (Ctrl+Z)"
      >
        <Undo className="w-4 h-4" />
      </button>
      
      <button 
        className="p-2 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onRedo}
        disabled={!canRedo}
        title="Redo (Ctrl+Y)"
      >
        <Redo className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-2" />
      
      {/* Field Actions */}
      <button 
        className="p-2 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onDelete}
        disabled={!selectedField}
        title="Delete Selected (Delete)"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      <button 
        className="p-2 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onDuplicate}
        disabled={!selectedField}
        title="Duplicate Selected"
      >
        <Copy className="w-4 h-4" />
      </button>

      <button 
        className="p-2 hover:bg-gray-100 rounded transition-colors"
        onClick={onClear}
        title="Clear Form"
      >
        <RotateCcw className="w-4 h-4" />
      </button>

      {/* Status */}
      <div className="flex-1 text-center">
        <span className="text-sm text-gray-500">
          {fieldsCount} component{fieldsCount !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Actions */}
      <Button
        variant="outline"
        size="sm"
        onClick={onPreview}
        className="flex items-center space-x-2"
      >
        <Eye className="w-4 h-4" />
        <span>Preview</span>
      </Button>

      <Button
        variant="secondary"
        size="sm"
        onClick={onExport}
        className="flex items-center space-x-2"
      >
        <Download className="w-4 h-4" />
        <span>Export</span>
      </Button>

      <Button
        variant="primary"
        size="sm"
        onClick={onSave}
        className="flex items-center space-x-2"
      >
        <Save className="w-4 h-4" />
        <span>Save</span>
      </Button>
    </div>
  );
};