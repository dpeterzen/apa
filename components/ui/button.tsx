import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        outline1:
          "border border-input bg-background hover:bg-accent/40 hover:text-accent-foreground dark:bg-secondary/40 dark:hover:bg-[hsl(var(--accent))] dark:border-transparent",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[hsl(var(--accent))]",
        tertiary:
            "hover:bg-[hsl(var(--accent))] text-secondary-foreground bg-zinc-800",
        ghost: "hover:bg-accent/40 dark:hover:bg-accent/20 hover:text-accent-foreground",
        ghost1: "hover:bg-accent/50 dark:hover:bg-accent hover:text-accent-foreground",
        ghost2: "hover:bg-accent/70 dark:hover:bg-accent/40 hover:text-accent-foreground",
        caption: "hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        segmented: "dark:bg-secondary/40 dark:hover:bg-[hsl(var(--accent))] relative border dark:border-transparent border-r-0 bg-background hover:bg-accent/40 text-accent-foreground after:content-[''] after:absolute after:right-0 after:top-[3px] after:h-4 after:w-[1px] dark:after:bg-white/20 after:bg-black/20",
        // Add segmented-end variant if needed to remove the divider
        "segmented-end": "dark:bg-secondary/40 dark:hover:bg-[hsl(var(--accent))] dark:border-transparent relative border border-l-0 bg-background hover:bg-accent/40 text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-1",
        lg: "h-11 rounded-md px-8",
        lgIcon: "h-12 w-12 rounded-md p-10",
        icon: "h-10 w-10",
        xs: "h-6 px-2 rounded-md",
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
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
