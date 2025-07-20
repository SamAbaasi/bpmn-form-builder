import React from 'react';
import { 
  Square, 
  CheckSquare, 
  Circle, 
  List, 
  Type, 
  Image, 
  Table, 
  FileText, 
  Minus, 
  Grid3X3,
  Layout,
  MousePointer
} from 'lucide-react';
import { ComponentType, ComponentCategory } from '@/types/ComponentType';

export const COMPONENT_CATEGORIES: ComponentCategory[] = [
  { 
    id: 'controls', 
    name: 'Form Controls', 
    icon: React.createElement(CheckSquare, { className: "w-4 h-4" }) 
  },
  { 
    id: 'presentation', 
    name: 'Presentation', 
    icon: React.createElement(Type, { className: "w-4 h-4" }) 
  },
  { 
    id: 'containers', 
    name: 'Containers', 
    icon: React.createElement(Layout, { className: "w-4 h-4" }) 
  },
  { 
    id: 'actions', 
    name: 'Actions', 
    icon: React.createElement(MousePointer, { className: "w-4 h-4" }) 
  }
];

export const COMPONENT_TYPES: ComponentType[] = [
  // Form Controls
  { 
    id: 'textfield', 
    name: 'Text Field', 
    icon: React.createElement(Type, { className: "w-5 h-5" }), 
    category: 'controls', 
    defaultProps: { type: 'textfield', width: 200, height: 40 } 
  },
  { 
    id: 'checkbox', 
    name: 'Checkbox', 
    icon: React.createElement(CheckSquare, { className: "w-5 h-5" }), 
    category: 'controls', 
    defaultProps: { type: 'checkbox', width: 120, height: 40 } 
  },
  { 
    id: 'checkboxGroup', 
    name: 'Checkbox Group', 
    icon: React.createElement(Grid3X3, { className: "w-5 h-5" }), 
    category: 'controls', 
    defaultProps: { type: 'checkboxGroup', width: 200, height: 80 } 
  },
  { 
    id: 'radio', 
    name: 'Radio Group', 
    icon: React.createElement(Circle, { className: "w-5 h-5" }), 
    category: 'controls', 
    defaultProps: { type: 'radio', width: 200, height: 80 } 
  },
  { 
    id: 'select', 
    name: 'Select', 
    icon: React.createElement(List, { className: "w-5 h-5" }), 
    category: 'controls', 
    defaultProps: { type: 'select', width: 200, height: 40 } 
  },
  { 
    id: 'taglist', 
    name: 'Tag List', 
    icon: React.createElement(Square, { className: "w-5 h-5" }), 
    category: 'controls', 
    defaultProps: { type: 'taglist', width: 300, height: 80 } 
  },
  
  // Presentation
  { 
    id: 'textview', 
    name: 'Text View', 
    icon: React.createElement(Type, { className: "w-5 h-5" }), 
    category: 'presentation', 
    defaultProps: { type: 'textview', width: 200, height: 40 } 
  },
  { 
    id: 'imageview', 
    name: 'Image View', 
    icon: React.createElement(Image, { className: "w-5 h-5" }), 
    category: 'presentation', 
    defaultProps: { type: 'imageview', width: 200, height: 150 } 
  },
  { 
    id: 'table', 
    name: 'Table', 
    icon: React.createElement(Table, { className: "w-5 h-5" }), 
    category: 'presentation', 
    defaultProps: { type: 'table', width: 300, height: 200 } 
  },
  { 
    id: 'htmlview', 
    name: 'HTML View', 
    icon: React.createElement(FileText, { className: "w-5 h-5" }), 
    category: 'presentation', 
    defaultProps: { type: 'htmlview', width: 200, height: 100 } 
  },
  { 
    id: 'spacer', 
    name: 'Spacer', 
    icon: React.createElement(Minus, { className: "w-5 h-5" }), 
    category: 'presentation', 
    defaultProps: { type: 'spacer', width: 200, height: 20 } 
  },
  
  // Containers
  { 
    id: 'group', 
    name: 'Group', 
    icon: React.createElement(Square, { className: "w-5 h-5" }), 
    category: 'containers', 
    defaultProps: { type: 'group', width: 300, height: 200 } 
  },
  { 
    id: 'dynamicList', 
    name: 'Dynamic List', 
    icon: React.createElement(List, { className: "w-5 h-5" }), 
    category: 'containers', 
    defaultProps: { type: 'dynamicList', width: 300, height: 150 } 
  },
  { 
    id: 'iframe', 
    name: 'IFrame', 
    icon: React.createElement(Layout, { className: "w-5 h-5" }), 
    category: 'containers', 
    defaultProps: { type: 'iframe', width: 300, height: 200 } 
  },
  
  // Actions
  { 
    id: 'button', 
    name: 'Button', 
    icon: React.createElement(Square, { className: "w-5 h-5" }), 
    category: 'actions', 
    defaultProps: { type: 'button', width: 100, height: 40 } 
  }
];

// Utility functions
export const getComponentById = (id: string): ComponentType | undefined => {
  return COMPONENT_TYPES.find(component => component.id === id);
};

export const getComponentsByCategory = (category: string): ComponentType[] => {
  return COMPONENT_TYPES.filter(component => component.category === category);
};

export const getCategoryById = (id: string): ComponentCategory | undefined => {
  return COMPONENT_CATEGORIES.find(category => category.id === id);
};

// Canvas configuration
export const CANVAS_CONFIG = {
  width: 800,
  minHeight: 400,
  padding: 40
};