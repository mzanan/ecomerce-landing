import { BaseButton, BaseButtonProps } from "./BaseButton"

interface SecondaryButtonProps extends Omit<BaseButtonProps, 'baseClasses'> {
  size?: "sm" | "lg" | "default"
}

export const SecondaryButton = ({ 
  size = "default",
  ...props 
}: SecondaryButtonProps) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    default: "px-6 py-3",
    lg: "px-8 py-4 text-lg"
  }

  const secondaryClasses = `font-medium rounded-full border-2 border-black text-black hover:bg-black hover:text-white ${sizeClasses[size]}`

  return (
    <BaseButton
      baseClasses={secondaryClasses}
      {...props}
    />
  )
} 