/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormField } from '@/types/FormField';

export const validateFormField = (field: FormField): string[] => {
  const errors: string[] = [];
  
  if (!field.label || field.label.trim() === '') {
    errors.push('Field label is required');
  }
  
  if (!field.key || field.key.trim() === '') {
    errors.push('Field key is required');
  }
  
  if (field.validation) {
    try {
      new RegExp(field.validation);
    } catch (e) {
      errors.push('Invalid validation pattern');
    }
  }
  
  if (field.width < 50) {
    errors.push('Width must be at least 50px');
  }
  
  if (field.height < 20) {
    errors.push('Height must be at least 20px');
  }
  
  return errors;
};

export const validateForm = (fields: FormField[]): { [key: string]: string[] } => {
  const errors: { [key: string]: string[] } = {};
  
  fields.forEach(field => {
    const fieldErrors = validateFormField(field);
    if (fieldErrors.length > 0) {
      errors[field.id] = fieldErrors;
    }
  });
  
  return errors;
};

export const downloadFile = (filename: string, content: string, type = 'application/json') => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportToJSON = (fields: FormField[]) => {
  const data = JSON.stringify(fields, null, 2);
  downloadFile(`form-${Date.now()}.json`, data);
};

export const exportToHTML = (fields: FormField[]) => {
  const fieldHTML = fields
    .sort((a, b) => a.y - b.y)
    .map(field => {
      switch (field.type) {
        case 'textfield':
          return `
        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 4px; font-weight: bold;">
            ${field.label}${field.required ? ' *' : ''}
          </label>
          <input type="text" name="${field.key}" ${field.placeholder ? `placeholder="${field.placeholder}"` : ''} 
                 style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
        </div>`;
        case 'checkbox':
          return `
        <div style="margin-bottom: 16px;">
          <label style="display: flex; align-items: center;">
            <input type="checkbox" name="${field.key}" style="margin-right: 8px;" />
            ${field.label}
          </label>
        </div>`;
        case 'select':
          return `
        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 4px; font-weight: bold;">${field.label}</label>
          <select name="${field.key}" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
            <option value="">Select an option</option>
          </select>
        </div>`;
        default:
          return `<div style="margin-bottom: 16px;">${field.label}</div>`;
      }
    }).join('');

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Form</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
        h1 { color: #333; }
        .form-container { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    </style>
</head>
<body>
    <div class="form-container">
        <h1>Generated Form</h1>
        <div id="form-content">
            ${fieldHTML}
            <button type="button" onclick="submitForm()" style="background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;">
                Submit
            </button>
        </div>
    </div>
    <script>
        function submitForm() {
            alert('Form submitted!');
            console.log('Form would be submitted here');
        }
    </script>
</body>
</html>`;

  downloadFile(`form-${Date.now()}.html`, html, 'text/html');
};