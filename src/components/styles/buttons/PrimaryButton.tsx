import { BaseButton, BaseButtonProps } from "./BaseButton"

export const PrimaryButton = ({ 
  ...props 
}: Omit<BaseButtonProps, 'baseClasses'>) => {
  const primaryClasses = "font-medium rounded-full bg-black text-white hover:bg-black/80"

  return (
    <BaseButton
      baseClasses={primaryClasses}
      {...props}
    />
  )
} 