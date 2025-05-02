import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-900/20 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200';
      case 'outline':
        return 'bg-transparent border border-slate-300 text-slate-900 hover:bg-slate-50 focus:ring-slate-900/20 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800';
      case 'ghost':
        return 'bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-900/20 dark:text-slate-300 dark:hover:bg-slate-800';
      default:
        return 'bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-900/20';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'py-1.5 px-3 text-sm';
      case 'lg':
        return 'py-3 px-5 text-lg';
      default:
        return 'py-2.5 px-4 text-base';
    }
  };

  return (
    <button
      className={`
        font-medium rounded-lg shadow-sm
        focus:outline-none focus:ring-2
        transition-all duration-200
        disabled:opacity-70 disabled:cursor-not-allowed
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={isLoading || disabled}
      {...props}
    >
      <span className="flex items-center justify-center">
        {isLoading && (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        )}
        {!isLoading && leftIcon && (
          <span className="mr-2">{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className="ml-2">{rightIcon}</span>
        )}
      </span>
    </button>
  );
};

export default Button;