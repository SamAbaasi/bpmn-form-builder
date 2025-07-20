# Form Builder Pro

A professional drag-and-drop form builder built with React, TypeScript, and Tailwind CSS.

## Demo

**Live Demo**: [BPMN Form Builder Demo](https://bpmn-form-builder.netlify.app/)

## ✨ Features

- 🎯 **Drag & Drop Interface**: Intuitive component placement and repositioning
- 🔧 **Rich Component Library**: 14+ form components including inputs, selects, tables, and containers
- ⚙️ **Properties Panel**: Complete configuration for all component properties
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 💾 **Auto-save**: Automatic form state persistence with localStorage
- 🎨 **Professional UI**: Modern, clean interface with smooth animations
- 📝 **TypeScript**: Full type safety and excellent developer experience
- ⌨️ **Keyboard Shortcuts**: Professional workflow with undo/redo support
- 👁️ **Form Preview**: Test your forms before deployment
- 📤 **Multiple Export Formats**: JSON and HTML export capabilities

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/form-builder-pro.git
cd form-builder-pro
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
# or
yarn build
```

## 🎮 Usage

### Adding Components
- **Drag & Drop**: Click and hold any component from the palette, then drag to the canvas
- **Click to Add**: Simple click adds components at random positions

### Repositioning Components
- Click and drag any component on the canvas to reposition it
- Use the properties panel for precise positioning with X/Y coordinates

### Configuring Components
1. Click on any component to select it
2. Use the properties panel on the right to configure:
   - General properties (label, description, key)
   - Validation rules
   - Layout settings
   - Conditional visibility

### Keyboard Shortcuts
- **Ctrl+Z** - Undo
- **Ctrl+Y** - Redo
- **Ctrl+S** - Save form as JSON
- **Delete** - Delete selected component

## 🧩 Component Library

### Form Controls
- **Text Field**: Basic text input with validation
- **Checkbox**: Single checkbox with label
- **Checkbox Group**: Multiple checkbox options
- **Radio Group**: Radio button selection
- **Select**: Dropdown selection
- **Tag List**: Multi-tag input

### Presentation
- **Text View**: Static text display
- **Image View**: Image placeholder
- **Table**: Data table with headers
- **HTML View**: Custom HTML content
- **Spacer**: Visual spacing element

### Containers
- **Group**: Container for grouping elements
- **Dynamic List**: Repeatable list container
- **IFrame**: Embedded content frame

### Actions
- **Button**: Action trigger button

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── FormBuilder/     # Main form builder components
│   │   ├── ComponentPalette/  # Component selection panel
│   │   ├── Canvas/           # Form canvas and field rendering
│   │   ├── PropertiesPanel/  # Component configuration
│   │   └── Toolbar/          # Action toolbar
│   └── UI/             # Reusable UI components
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── constants/          # Application constants
└── styles/             # CSS and styling
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_NAME=Form Builder Pro
REACT_APP_VERSION=1.0.0
```

### Customizing Components
Add new component types by extending the `COMPONENT_TYPES` array in `src/constants/componentTypes.ts`:

```typescript
{
  id: 'custom-component',
  name: 'Custom Component',
  icon: <YourIcon className="w-5 h-5" />,
  category: 'controls',
  defaultProps: { type: 'custom-component', width: 200, height: 40 }
}
```

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `src/styles/globals.css` for global styles
- Component-specific styles in `src/styles/components.css`

## 📚 API Reference

### FormBuilder Props
```typescript
interface FormBuilderProps {
  initialFields?: FormField[];
  onSave?: (fields: FormField[]) => void;
  onExport?: (fields: FormField[]) => void;
  readOnly?: boolean;
}
```

### FormField Interface
```typescript
interface FormField {
  id: string;
  type: string;
  label: string;
  key: string;
  x: number;
  y: number;
  width: number;
  height: number;
  // ... other properties
}
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## 🚢 Deployment

### Static Hosting (Netlify, Vercel)
```bash
npm run build
# Deploy the build folder
```

### Docker
```bash
docker build -t form-builder-pro .
docker run -p 3000:80 form-builder-pro
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write tests for new features
- Update documentation as needed
- Follow the existing code style

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide React](https://lucide.dev/) - Icons
- [Vite](https://vitejs.dev/) - Build tool

## 📞 Support

- 📧 Email: support@formbuilder.pro
- 💬 Discord: [Join Community](https://discord.gg/formbuilder)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/form-builder-pro/issues)
- 📖 Documentation: [Wiki](https://github.com/yourusername/form-builder-pro/wiki)

## 🗺️ Roadmap

- [ ] Form validation engine
- [ ] Custom component plugins
- [ ] Form templates
- [ ] Backend integrations
- [ ] Mobile app
- [ ] Advanced animations
- [ ] Collaboration features

---

Made with ❤️ by [Your Name](https://github.com/yourusername)
```

## LICENSE
```
MIT License

Copyright (c) 2024 Form Builder Pro

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## .env.example
```
# Application Configuration
REACT_APP_NAME=Form Builder Pro
REACT_APP_VERSION=1.0.0

# API Configuration (if needed)
REACT_APP_API_URL=http://localhost:3001

# Feature Flags
REACT_APP_ENABLE_ANALYTICS=false
REACT_APP_ENABLE_PREVIEW=true

# Development
REACT_APP_DEBUG=false
