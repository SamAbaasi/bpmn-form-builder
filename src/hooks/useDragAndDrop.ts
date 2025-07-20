// src/hooks/useDragAndDrop.ts
import { useState, useEffect, useCallback, useRef } from 'react';
import { DragState, Position } from '@/types/DragState';
import { ComponentType } from '@/types/ComponentType';
import { FormField } from '@/types/FormField';
import { getCanvasPosition } from '@/utils/dragHelpers';

interface UseDragAndDropProps {
  onFieldAdd: (componentType: ComponentType, position: Position) => void;
  onFieldMove: (fieldId: string, position: Position) => void;
  canvasRef: React.RefObject<HTMLDivElement | null>;
}

export const useDragAndDrop = ({ onFieldAdd, onFieldMove, canvasRef }: UseDragAndDropProps) => {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    dragType: null
  });

  const dragPreviewRef = useRef<HTMLDivElement | null>(null);

  const startNewComponentDrag = useCallback((e: React.MouseEvent, componentType: ComponentType) => {
    e.preventDefault();
    
    setDragState({
      isDragging: true,
      dragType: 'new',
      componentType,
      startPosition: { x: e.clientX, y: e.clientY },
      currentPosition: { x: e.clientX, y: e.clientY }
    });
  }, []);

  const startExistingFieldDrag = useCallback((e: React.MouseEvent, field: FormField) => {
    e.preventDefault();
    e.stopPropagation();
    
    const fieldRect = e.currentTarget.getBoundingClientRect();
    const offset = {
      x: e.clientX - fieldRect.left,
      y: e.clientY - fieldRect.top
    };

    setDragState({
      isDragging: true,
      dragType: 'existing',
      fieldId: field.id,
      startPosition: { x: e.clientX, y: e.clientY },
      currentPosition: { x: e.clientX, y: e.clientY },
      offset
    });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragState.isDragging) return;

      setDragState(prev => ({
        ...prev,
        currentPosition: { x: e.clientX, y: e.clientY }
      }));

      // Update drag preview position
      if (dragPreviewRef.current) {
        dragPreviewRef.current.style.left = `${e.clientX + 10}px`;
        dragPreviewRef.current.style.top = `${e.clientY + 10}px`;
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!dragState.isDragging) return;

      const canvasPosition = getCanvasPosition(e.clientX, e.clientY, canvasRef);

      if (dragState.dragType === 'new' && dragState.componentType) {
        onFieldAdd(dragState.componentType, canvasPosition);
      } else if (dragState.dragType === 'existing' && dragState.fieldId && dragState.offset) {
        const finalPosition = {
          x: canvasPosition.x - dragState.offset.x,
          y: canvasPosition.y - dragState.offset.y
        };
        onFieldMove(dragState.fieldId, finalPosition);
      }

      setDragState({
        isDragging: false,
        dragType: null
      });
    };

    if (dragState.isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [dragState, canvasRef, onFieldAdd, onFieldMove]);

  return {
    dragState,
    dragPreviewRef,
    startNewComponentDrag,
    startExistingFieldDrag
  };
};