import { COMPONENT_TYPES } from '@/constants/componentTypes';

export const componentRegistry = {
  getAll: () => COMPONENT_TYPES,
  getById: (id: string) => COMPONENT_TYPES.find(c => c.id === id),
  getByCategory: (category: string) => COMPONENT_TYPES.filter(c => c.category === category),
  search: (query: string) => COMPONENT_TYPES.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase())
  )
};