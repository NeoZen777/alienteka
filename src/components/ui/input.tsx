import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-alien-gray bg-alien-dark px-3 py-2 text-sm text-alien-light ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-alien-light/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alien-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:border-alien-primary/50 focus:border-alien-primary focus:shadow-alien-glow-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
