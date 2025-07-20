import React from 'react';
import FormBuilder from './components/FormBuilder/FormBuilder';
import './styles/globals.css';

function App() {
  const handleSave = (fields: any[]) => {
    console.log('Saving fields:', fields);
    // Implement your save logic here
    // e.g., send to API, save to localStorage, etc.
  };

  const handleExport = (fields: any[]) => {
    console.log('Exporting fields:', fields);
    // Implement your export logic here
  };

  return (
    <div className="App">
      <FormBuilder 
        onSave={handleSave}
        onExport={handleExport}
      />
    </div>
  );
}

export default App;