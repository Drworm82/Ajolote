import * as React from 'react';

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'ghost' | 'default';
  size?: 'icon' | 'lg' | 'md' | 'sm';
  className?: string;
};

export function Button({ variant='default', size='md', className='', ...props }: BtnProps) {
  const base = 'inline-flex items-center justify-center rounded-md px-4 py-2 font-medium transition';
  const variants = { default: 'bg-teal-600 hover:bg-teal-700 text-white', ghost: 'bg-transparent hover:bg-black/10' };
  const sizes = { icon: 'w-10 h-10 p-0', lg: 'h-12', md: 'h-10', sm: 'h-8' };
  return <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />;
}
export default Button;
