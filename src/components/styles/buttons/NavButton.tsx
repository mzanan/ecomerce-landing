import { ReactNode, ButtonHTMLAttributes } from 'react'

interface NavButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  active?: boolean
  className?: string
}

export const NavButton = ({ 
  children, 
  active = false, 
  className = '', 
  ...props 
}: NavButtonProps) => {
  const baseClasses = "flex items-center space-x-2 px-4 py-2 rounded-full transition-all"
  const activeClasses = active 
    ? "bg-white shadow-sm text-slate-900" 
    : "text-slate-600 hover:text-slate-900 bg-slate-100"
  
  return (
    <button 
      className={`${baseClasses} ${activeClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
} 