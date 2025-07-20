import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { CategorySection } from './CategorySection';
import { COMPONENT_CATEGORIES } from '@/constants/componentTypes';
import { ComponentType } from '@/types/ComponentType';

interface ComponentPaletteProps {
  onComponentDrag: (e: React.MouseEvent, componentType: ComponentType) => void;
  onComponentAdd: (componentType: ComponentType) => void;
  searchTerm?: string;
}

export const ComponentPalette: React.FC<ComponentPaletteProps> = ({
  onComponentDrag,
  onComponentAdd,
  searchTerm: externalSearchTerm
}) => {
  const [searchTerm, setSearchTerm] = useState(externalSearchTerm || '');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['controls', 'presentation', 'containers', 'actions'])
  );

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  return (
    <div className="w-64 bg-white border-r border-gray-300 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-800 mb-3">Components</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search components"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
      
      {/* Categories */}
      <div className="flex-1 overflow-y-auto">
        {COMPONENT_CATEGORIES.map(category => (
          <CategorySection
            key={category.id}
            category={category}
            isExpanded={expandedCategories.has(category.id)}
            searchTerm={searchTerm}
            onToggle={() => toggleCategory(category.id)}
            onComponentDrag={onComponentDrag}
            onComponentAdd={onComponentAdd}
          />
        ))}
      </div>
    </div>
  );
};