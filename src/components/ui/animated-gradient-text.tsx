"use client"

import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface AnimatedGradientTextProps {
  children: ReactNode
  className?: string
}

export function AnimatedGradientText({
  children,
  className,
}: AnimatedGradientTextProps) {
  return (
    <div
      className={cn(
        "group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-full bg-white/5 backdrop-blur-sm px-4 py-1.5 text-sm font-medium shadow-lg transition-shadow duration-500 hover:shadow-xl hover:shadow-primary/20",
        "border border-white/10",
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-full bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
        )}
      />
      <span className="relative z-10 bg-gradient-to-r from-primary via-white to-primary bg-clip-text text-transparent">
        {children}
      </span>
    </div>
  )
}
