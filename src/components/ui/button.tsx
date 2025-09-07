import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alien-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-alien-primary text-alien-dark hover:bg-alien-accent shadow-alien-glow-sm hover:shadow-alien-glow",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-alien-primary text-alien-primary hover:bg-alien-primary hover:text-alien-dark hover:shadow-alien-glow-sm",
        secondary: "bg-alien-secondary text-alien-light hover:bg-alien-gray",
        ghost: "text-alien-light hover:bg-alien-gray hover:text-alien-primary",
        neon: "bg-transparent border-2 border-alien-accent text-alien-accent hover:bg-alien-accent hover:text-alien-dark shadow-neon hover:shadow-alien-glow-lg transition-all duration-300",
        alien: "bg-gradient-to-r from-alien-primary to-alien-accent text-alien-dark hover:from-alien-accent hover:to-alien-primary shadow-alien-glow hover:shadow-alien-glow-lg hover:animate-pulse",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
