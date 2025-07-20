import React from 'react';

export const DropZone: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-blue-100 bg-opacity-30 border-2 border-dashed border-blue-400 rounded flex items-center justify-center">
      <div className="bg-white px-4 py-2 rounded shadow-lg">
        <span className="text-blue-600 font-medium">Drop component here</span>
      </div>
    </div>
  );
};
