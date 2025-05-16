import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

type CardProps = {
  className?: string;
  children: React.ReactNode;
  clickable?: boolean;
  onClick?: () => void;
};

const Card: React.FC<CardProps> = ({ 
  className, 
  children, 
  clickable = false,
  onClick
}) => {
  return (
    <motion.div 
      className={cn(
        'rounded-lg shadow-md bg-white overflow-hidden',
        clickable && 'cursor-pointer hover:shadow-lg transition-shadow',
        className
      )}
      whileHover={clickable ? { scale: 1.02 } : {}}
      whileTap={clickable ? { scale: 0.98 } : {}}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export const CardHeader: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className, 
  children 
}) => {
  return (
    <div className={cn('p-5 border-b border-gray-100', className)}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className, 
  children 
}) => {
  return (
    <div className={cn('p-5', className)}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className, 
  children 
}) => {
  return (
    <div className={cn('p-5 border-t border-gray-100', className)}>
      {children}
    </div>
  );
};

export default Card;