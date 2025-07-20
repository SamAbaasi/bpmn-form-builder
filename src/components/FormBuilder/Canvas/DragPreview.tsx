// src/components/FormBuilder/Canvas/DragPreview.tsx
import React from 'react';
import { DragState } from '@/types/DragState';

interface DragPreviewProps {
  dragState: DragState;
  dragPreviewRef: React.RefObject<HTMLDivElement | null>;
}

export const DragPreview: React.FC<DragPreviewProps> = ({
  dragState,
  dragPreviewRef
}) => {
  if (!dragState.isDragging || !dragState.componentType) {
    return null;
  }

  return (
    <div
      ref={dragPreviewRef}
      className="fixed z-50 pointer-events-none bg-white border-2 border-blue-500 rounded shadow-lg p-2 opacity-80"
      style={{
        left: dragState.currentPosition?.x || 0,
        top: dragState.currentPosition?.y || 0
      }}
    >
      <div className="flex items-center space-x-2">
        {dragState.componentType.icon}
        <span className="text-sm text-gray-700">{dragState.componentType.name}</span>
      </div>
    </div>
  );
};