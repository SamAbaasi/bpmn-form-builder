import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { ComponentButton } from './ComponentButton';
import { getComponentsByCategory } from '@/constants/componentTypes';
import { ComponentCategory, ComponentType } from '@/types/ComponentType';

interface CategorySectionProps {
  category: ComponentCategory;
  isExpanded: boolean;
  searchTerm: string;
  onToggle: () => void;
  onComponentDrag: (e: React.MouseEvent, componentType: ComponentType) => void;
  onComponentAdd: (componentType: ComponentType) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  isExpanded,
  searchTerm,
  onToggle,
  onComponentDrag,
  onComponentAdd
}) => {
  const components = getComponentsByCategory(category.id);
  const filteredComponents = searchTerm
    ? components.filter(comp => 
        comp.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : components;

  if (searchTerm && filteredComponents.length === 0) {
    return null;
  }

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-2">
          {category.icon}
          <span className="font-medium text-gray-700">{category.name}</span>
        </div>
        {isExpanded ? 
          <ChevronDown className="w-4 h-4" /> : 
          <ChevronRight className="w-4 h-4" />
        }
      </button>
      
      {isExpanded && (
        <div className="pb-2">
          {filteredComponents.map(component => (
            <ComponentButton
              key={component.id}
              component={component}
              onDrag={onComponentDrag}
              onAdd={onComponentAdd}
            />
          ))}
        </div>
      )}
    </div>
  );
};