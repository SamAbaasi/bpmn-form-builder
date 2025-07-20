import { ReactNode } from 'react';
import { FormField } from './FormField';

export interface ComponentType {
  id: string;
  name: string;
  icon: ReactNode;
  category: string;
  defaultProps: Partial<FormField>;
}

export interface ComponentCategory {
  id: string;
  name: string;
  icon: ReactNode;
}