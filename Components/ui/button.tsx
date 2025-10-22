import * as React from 'react'

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'ghost' | 'default'
  size?: 'icon' | 'lg' | 'md' | 'sm'
  className?: string
}

export default function Button({ variant='default', size='md', className='', ...props }: BtnProps) {
  const base = 'inline-flex items-center justify-center rounded-md px-4 py-2 font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variants = {
    default: 'bg-brand-red text-white hover:bg-red-700 focus:ring-red-300',
    ghost: 'bg-transparent text-inherit hover:bg-black/10 focus:ring-black/20'
  } as const
  const sizes = {
    icon: 'w-10 h-10 p-0',
    lg: 'h-12',
    md: 'h-10',
    sm: 'h-8'
  } as const
  return <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />
}
