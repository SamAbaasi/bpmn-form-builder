// src/utils/dragHelpers.ts
import { Position } from '@/types/DragState';

export const getCanvasPosition = (
  clientX: number, 
  clientY: number, 
  canvasRef: React.RefObject<HTMLDivElement | null>
): Position => {
  if (!canvasRef.current) return { x: 0, y: 0 };
  
  const canvasRect = canvasRef.current.getBoundingClientRect();
  return {
    x: Math.max(0, clientX - canvasRect.left),
    y: Math.max(0, clientY - canvasRect.top)
  };
};

export const calculateFieldPosition = (
  clientX: number,
  clientY: number,
  offset: Position,
  canvasRef: React.RefObject<HTMLDivElement | null>
): Position => {
  const canvasPosition = getCanvasPosition(clientX, clientY, canvasRef);
  return {
    x: canvasPosition.x - offset.x,
    y: canvasPosition.y - offset.y
  };
};

export const snapToGrid = (position: Position, gridSize: number = 10): Position => {
  return {
    x: Math.round(position.x / gridSize) * gridSize,
    y: Math.round(position.y / gridSize) * gridSize
  };
};

export const isPositionWithinBounds = (
  position: Position,
  bounds: { width: number; height: number }
): boolean => {
  return (
    position.x >= 0 &&
    position.y >= 0 &&
    position.x <= bounds.width &&
    position.y <= bounds.height
  );
};

export const constrainToCanvas = (
  position: Position,
  fieldSize: { width: number; height: number },
  canvasSize: { width: number; height: number }
): Position => {
  return {
    x: Math.max(0, Math.min(position.x, canvasSize.width - fieldSize.width)),
    y: Math.max(0, Math.min(position.y, canvasSize.height - fieldSize.height))
  };
};

export const getRelativePosition = (
  absolutePosition: Position,
  parentElement: HTMLElement
): Position => {
  const parentRect = parentElement.getBoundingClientRect();
  return {
    x: absolutePosition.x - parentRect.left,
    y: absolutePosition.y - parentRect.top
  };
};

export const getDistanceBetweenPoints = (
  point1: Position,
  point2: Position
): number => {
  const deltaX = point2.x - point1.x;
  const deltaY = point2.y - point1.y;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
};

export const isDragThresholdMet = (
  startPosition: Position,
  currentPosition: Position,
  threshold: number = 5
): boolean => {
  return getDistanceBetweenPoints(startPosition, currentPosition) > threshold;
};