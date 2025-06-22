import { BaseButton, BaseButtonProps } from "./BaseButton"

interface PrimaryButtonProps extends Omit<BaseButtonProps, 'baseClasses'> {}

export const PrimaryButton = ({ 
  ...props 
}: PrimaryButtonProps) => {
  const primaryClasses = "font-medium rounded-full bg-black text-white hover:bg-black/80"

  return (
    <BaseButton
      baseClasses={primaryClasses}
      {...props}
    />
  )
} 