export interface FormField {
    id: string;
    type: string;
    label: string;
    key: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    description?: string;
    validation?: string;
    options?: string[];
    condition?: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }