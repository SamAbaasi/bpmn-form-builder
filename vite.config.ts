// vite.config.ts (create this file in your project root)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/constants': path.resolve(__dirname, './src/constants'),
    },
  },
})

// Alternative: If you don't want to create vite.config.ts, 
// you can also use relative imports in your FormBuilder.tsx:

/*
// src/components/FormBuilder/FormBuilder.tsx
import { useFormFields } from '../../hooks/useFormFields';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { exportToJSON, exportToHTML } from '../../utils/validation';
*/