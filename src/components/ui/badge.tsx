"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "destructive" | "success"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20":
            variant === "default",
          "bg-secondary text-secondary-foreground hover:bg-secondary/80":
            variant === "secondary",
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground":
            variant === "outline",
          "bg-destructive/10 text-destructive border border-destructive/20":
            variant === "destructive",
          "bg-green-500/10 text-green-500 border border-green-500/20":
            variant === "success",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge, type BadgeProps }
