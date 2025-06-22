import { ButtonHTMLAttributes, ReactNode } from "react"

export interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  isLoading?: boolean
  loadingText?: ReactNode
  fullWidth?: boolean
  size?: "sm" | "lg" | "default"
  baseClasses?: string
}

export const BaseButton = ({ 
  children, 
  isLoading = false, 
  loadingText,
  fullWidth = false,
  size = "default",
  baseClasses = "",
  className = "",
  disabled,
  ...props 
}: BaseButtonProps) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm h-9",
    default: "px-6 py-3 h-10",
    lg: "px-8 py-4 text-lg h-12"
  }

  const baseStyles = `transition-all duration-300 hover:scale-105 flex items-center justify-center ${fullWidth && "w-full"} ${sizeClasses[size]}`
  
  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${baseClasses} ${className}`}
      {...props}
    >
      {isLoading ? (loadingText || "Loading...") : children}
    </button>
  )
} 