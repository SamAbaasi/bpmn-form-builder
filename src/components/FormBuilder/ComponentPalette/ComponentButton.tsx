import React from 'react';
import { ComponentType } from '@/types/ComponentType';

interface ComponentButtonProps {
  component: ComponentType;
  onDrag: (e: React.MouseEvent, componentType: ComponentType) => void;
  onAdd: (componentType: ComponentType) => void;
}

export const ComponentButton: React.FC<ComponentButtonProps> = ({
  component,
  onDrag,
  onAdd
}) => {
  return (
    <button
      className="w-full px-6 py-2 flex items-center space-x-3 hover:bg-blue-50 text-left cursor-grab active:cursor-grabbing transition-colors"
      onClick={() => onAdd(component)}
      onMouseDown={(e) => onDrag(e, component)}
    >
      {component.icon}
      <span className="text-sm text-gray-700">{component.name}</span>
    </button>
  );
};