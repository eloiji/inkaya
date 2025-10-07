"use client";

type ButtonSize = "sm" | "md" | "lg";
type ButtonType = "button" | "submit" | "reset";
type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    type?: ButtonType;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
}

export default function Button(props: ButtonProps) {
    const { children, size, variant, ...rest } = props;
    // 1. Base Classes: Applied to all buttons for universal styling
  const baseClasses: string =
    'font-semibold rounded-lg transition duration-150 ease-in-out ' +
    'focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ' +
    'cursor-pointer';

  // 2. Size Classes: Determines padding and text size
  let sizeClasses: string = '';
  switch (size) {
    case 'sm':
      sizeClasses = 'px-3 py-1.5 text-sm';
      break;
    case 'lg':
      sizeClasses = 'px-6 py-3 text-lg';
      break;
    case 'md':
    default:
      sizeClasses = 'px-4 py-2 text-base';
      break;
  }

  // 3. Variant Classes: Determines colors and hover effects
  let variantClasses: string = '';
  switch (variant) {
    case 'secondary':
      variantClasses = 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400';
      break;
    case 'danger':
      variantClasses = 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
      break;
    case 'ghost':
      variantClasses = 'bg-transparent text-cyan-600 hover:bg-cyan-100 focus:ring-cyan-500 border border-cyan-600';
      break;
    default:
      variantClasses = 'bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-500'; // Fallback to primary
      break;
  }

  // 4. Combine all classes
  const finalClasses: string = `${baseClasses} ${sizeClasses} ${variantClasses}`;

  return <button {...rest} className={finalClasses}>{children}</button>;
}