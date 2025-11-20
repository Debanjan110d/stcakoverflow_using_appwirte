"use client"

import { cn } from "@/lib/utils"
import React from "react"

interface BorderBeamProps {
  className?: string
  size?: number
  duration?: number
  borderWidth?: number
  colorFrom?: string
  colorTo?: string
  delay?: number
}

export function BorderBeam({
  className,
  size = 200,
  duration = 8,
  borderWidth = 2,
  colorFrom = "#0ea5a4",
  colorTo = "#ffffff",
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": duration,
          "--border-width": borderWidth,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": delay,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit]",
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-[inherit]",
          "animate-border-beam"
        )}
        style={{
          background: `linear-gradient(90deg, transparent, var(--color-from), var(--color-to), transparent)`,
          animation: `border-beam var(--duration)s linear infinite`,
          animationDelay: `calc(var(--delay) * 1s)`,
        }}
      />
    </div>
  )
}
