import { ComponentType } from './ComponentType';

export interface Position {
  x: number;
  y: number;
}

export interface DragState {
  isDragging: boolean;
  dragType: 'new' | 'existing' | null;
  componentType?: ComponentType;
  fieldId?: string;
  startPosition?: Position;
  currentPosition?: Position;
  offset?: Position;
}