import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center px-2.5 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground",
        outline: "bg-transparent text-muted-foreground border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants>) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      style={{
        fontFamily: 'var(--font-family)',
        fontSize: 'var(--text-sm)',
        fontWeight: 'var(--font-medium)',
        backgroundColor: 'var(--badge-bg)',
        color: 'var(--badge-text)',
        border: '1px solid var(--badge-border)',
        borderRadius: 'var(--radius-sm)',
        padding: '4px 10px',
      }}
      {...props}
    />
  );
}

export { Badge, badgeVariants };