import * as React from "react"
import { cn } from "@/lib/utils"

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "w-full max-w-md rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm text-white",
        className
      )}
    >
      {children}
    </div>
  )
}

export { Card }
