"use client"

import { cn } from "@/lib/utils"

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string
  shimmerSize?: string
  borderRadius?: string
  shimmerDuration?: string
  background?: string
  children?: React.ReactNode
}

export function ShimmerButton({
  shimmerColor = "#0ea5a4",
  shimmerSize = "0.1em",
  borderRadius = "0.5rem",
  shimmerDuration = "2s",
  background = "linear-gradient(90deg, #0ea5a4, #111827)",
  className,
  children,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      style={
        {
          "--shimmer-color": shimmerColor,
          "--shimmer-size": shimmerSize,
          "--border-radius": borderRadius,
          "--shimmer-duration": shimmerDuration,
          "--background": background,
        } as React.CSSProperties
      }
      className={cn(
        "group relative overflow-hidden rounded-[--border-radius] px-6 py-3",
        "bg-[image:var(--background)]",
        "text-white font-semibold text-sm",
        "shadow-lg shadow-primary/25",
        "transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/40",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        className
      )}
      {...props}
    >
      {/* Shimmer effect */}
      <span
        className={cn(
          "absolute inset-0 -translate-x-full",
          "bg-gradient-to-r from-transparent via-white/20 to-transparent",
          "group-hover:translate-x-full",
          "transition-transform duration-[--shimmer-duration] ease-in-out"
        )}
      />
      <span className="relative z-10">{children}</span>
    </button>
  )
}
