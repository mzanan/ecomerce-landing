import { ButtonHTMLAttributes, ReactNode } from "react"

interface LinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: "nav" | "brand"
}

export const LinkButton = ({ 
  children, 
  variant = "nav",
  className = "",
  ...props 
}: LinkButtonProps) => {
  const variantClasses = {
    nav: "px-4 py-2 rounded-full text-sm text-black hover:bg-black/10 hover:scale-105 transition-all duration-300",
    brand: "text-xl font-bold text-black hover:scale-105 transition-all duration-300"
  }

  return (
    <button
      className={`${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
} 