import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 outline-none font-medium border-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:opacity-90",
        outline: "bg-card text-foreground border hover:bg-muted",
        ghost: "bg-transparent text-foreground hover:bg-muted",
        link: "text-primary underline-offset-4 hover:underline bg-transparent",
      },
      size: {
        default: "h-10 px-6 text-base rounded-md",
        sm: "h-9 px-4 text-sm rounded-md",
        lg: "h-11 px-8 text-base rounded-md",
        icon: "h-9 w-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      style={{
        fontFamily: 'var(--font-family)',
        fontSize: 'var(--button-label)',
        fontWeight: '500',
        lineHeight: '20px',
        ...(variant === 'default' && {
          backgroundColor: 'var(--primary)',
          color: 'var(--primary-foreground)',
        }),
        ...(variant === 'outline' && {
          backgroundColor: 'var(--card)',
          color: 'var(--foreground)',
          border: '1px solid var(--border)',
        }),
        ...(variant === 'ghost' && {
          backgroundColor: 'transparent',
          color: 'var(--muted-foreground)',
        }),
      }}
      {...props}
    />
  );
}

export { Button, buttonVariants };