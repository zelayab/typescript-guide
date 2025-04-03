import { Example } from './types';

export const reactExamples: Example[] = [
  {
    id: 'react-basic-1',
    title: 'Componente Funcional con Props Tipadas',
    description: 'Implementación de un componente de botón reutilizable con TypeScript',
    code: `interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  icon
}) => {
  const baseClasses = 'rounded-md font-medium transition-colors';
  const sizeClasses = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg'
  };
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800'
  };

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={\`\${baseClasses} \${sizeClasses[size]} \${variantClasses[variant]}\`}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Cargando...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          {icon}
          {text}
        </span>
      )}
    </button>
  );
};`,
    explanation: 'Este ejemplo muestra cómo crear un componente de botón reutilizable con TypeScript, incluyendo props tipadas para texto, eventos, variantes, tamaños, estados de carga e iconos.',
    realWorldUsage: 'Ideal para sistemas de diseño y bibliotecas de componentes donde se necesita consistencia y tipo-seguridad en los componentes de UI.',
    category: 'basic',
    tags: ['react', 'components', 'typescript', 'ui'],
    framework: 'react'
  },
  {
    id: 'react-basic-2',
    title: 'Hook Personalizado para Formularios',
    description: 'Hook personalizado para manejar formularios con validación',
    code: `interface FormField<T> {
  value: T;
  error?: string;
  touched: boolean;
}

type FormState<T> = {
  [K in keyof T]: FormField<T[K]>;
};

type ValidationRules<T> = {
  [K in keyof T]?: (value: T[K]) => string | undefined;
};

export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validationRules?: ValidationRules<T>
) {
  const [formState, setFormState] = useState<FormState<T>>(() => {
    const initial: FormState<T> = {} as FormState<T>;
    for (const key in initialValues) {
      initial[key] = {
        value: initialValues[key],
        touched: false
      };
    }
    return initial;
  });

  const handleChange = useCallback((name: keyof T, value: T[keyof T]) => {
    setFormState(prev => ({
      ...prev,
      [name]: {
        value,
        touched: true,
        error: validationRules?.[name]?.(value)
      }
    }));
  }, [validationRules]);

  const handleBlur = useCallback((name: keyof T) => {
    setFormState(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        touched: true,
        error: validationRules?.[name]?.(prev[name].value)
      }
    }));
  }, [validationRules]);

  const isValid = useCallback(() => {
    for (const key in formState) {
      if (formState[key].error) return false;
    }
    return true;
  }, [formState]);

  return {
    formState,
    handleChange,
    handleBlur,
    isValid
  };
}`,
    explanation: 'Este hook personalizado proporciona una solución tipada para manejar formularios en React, incluyendo validación, seguimiento de campos tocados y manejo de errores.',
    realWorldUsage: 'Útil en aplicaciones que requieren formularios complejos con validación en tiempo real y manejo de estado tipado.',
    category: 'basic',
    tags: ['react', 'hooks', 'forms', 'validation'],
    framework: 'react'
  }
]; 