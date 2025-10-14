"use client";

type ButtonSize = "sm" | "md" | "lg";
type ButtonType = "button" | "submit" | "reset";
type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: ButtonType;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
}

export default function Button(props: ButtonProps) {
  const { children, size, variant, ...rest } = props;
  // Base Classes: Applied to all buttons for universal styling
  const iconBaseClasses: string = [
    'font-semibold',
    'rounded-lg',
    'transition',
    'duration-150',
    'ease-in-out',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'cursor-pointer'
  ].join(' ');

  // Base Classes: Applied to all buttons for universal styling
  const baseClasses: string = `${iconBaseClasses} focus:outline-none focus:ring-2 focus:ring-offset-2`;

  // Size Classes: Determines padding and text size
  let sizeClasses: string = '';
  switch (size) {
    case 'sm':
      sizeClasses = 'px-3 py-1.5 text-sm';
      break;
    case 'lg':
      sizeClasses = 'px-6 py-3 text-lg';
      break;
    case 'md':
      sizeClasses = 'px-4 py-2 text-base';
      break;
    default:
      sizeClasses = 'ml-2 py-1'; // Default for icon buttons
      break;
  }

  // Variant Classes: Determines colors and hover effects
  const buttonClasses: Record<ButtonVariant, string> = {
    primary: 'bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ghost: 'bg-transparent text-cyan-600 hover:bg-cyan-100 focus:ring-cyan-500 border border-cyan-600',
    icon: 'bg-transparent text-cyan-900',
  };
  let variantClasses: string = '';
  switch (variant) {
    case 'primary':
      variantClasses = buttonClasses.primary;
      break;
    case 'secondary':
      variantClasses = buttonClasses.secondary;
      break;
    case 'danger':
      variantClasses = buttonClasses.danger;
      break;
    case 'ghost':
      variantClasses = buttonClasses.ghost;
      break;
    case 'icon':
      variantClasses = buttonClasses.icon;
      break;
    default:
      variantClasses = buttonClasses.primary; // Default to primary if no variant specified
      break;
  }

  // Combine all classes
  const finalClasses: string = variant ==='icon' 
    ? `${iconBaseClasses} ${sizeClasses} ${variantClasses}` 
    : `${baseClasses} ${sizeClasses} ${variantClasses}`;

  return <button {...rest} className={finalClasses}>{children}</button>;
}