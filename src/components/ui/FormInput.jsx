import React from 'react';

const FormInput = ({
  label,
  id,
  error,
  icon,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-slate-700 dark:text-slate-300"
      >
        {label}
      </label>
      
      <div className="relative">
        <input
          id={id}
          className={`
            w-full py-3 px-4 pr-10 bg-white dark:bg-slate-800 
            border ${error ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} 
            rounded-lg shadow-sm text-slate-900 dark:text-white
            placeholder-slate-400 dark:placeholder-slate-500
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-0 
            ${error ? 'focus:ring-red-500' : 'focus:ring-slate-400 dark:focus:ring-slate-600'} 
            ${className}
          `}
          {...props}
        />
        {icon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {icon}
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>
      )}
    </div>
  );
};

export default FormInput;