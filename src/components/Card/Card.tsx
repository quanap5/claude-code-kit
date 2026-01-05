import React from 'react';

export interface CardProps {
  /** Content to display inside the card */
  children: React.ReactNode;
  /** Optional title displayed at the top of the card */
  title?: string;
  /** Optional subtitle displayed below the title */
  subtitle?: string;
  /** Additional CSS classes to apply */
  className?: string;
  /** Card variant style */
  variant?: 'default' | 'outlined' | 'elevated';
  /** Optional click handler */
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  className = '',
  variant = 'default',
  onClick,
}) => {
  const baseStyles = 'rounded-lg p-4';

  const variantStyles = {
    default: 'bg-white border border-gray-200',
    outlined: 'bg-transparent border-2 border-gray-300',
    elevated: 'bg-white shadow-lg',
  };

  const interactiveStyles = onClick
    ? 'cursor-pointer hover:shadow-md transition-shadow duration-200'
    : '';

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${interactiveStyles} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {title && (
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      )}
      {subtitle && (
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      )}
      <div className={title || subtitle ? 'mt-3' : ''}>{children}</div>
    </div>
  );
};

export default Card;
