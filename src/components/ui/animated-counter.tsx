"use client"

import React, { useEffect, useRef, useState } from 'react'
import { animate } from 'animejs'
import { cn } from '@/lib/utils'

interface AnimatedCounterProps {
  value: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
  decimals?: number
}

export function AnimatedCounter({
  value,
  duration = 2000,
  className,
  prefix = '',
  suffix = '',
  decimals = 0
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const counterRef = useRef<HTMLSpanElement>(null)
  const animRef = useRef<ReturnType<typeof animate> | null>(null)

  useEffect(() => {
    if (!counterRef.current) return

    const obj = { value: 0 }
    
    if (animRef.current) {
      animRef.current.cancel()
    }
    
    animRef.current = animate(obj, {
      value: value,
      duration,
      easing: 'easeOutExpo',
      round: decimals === 0 ? 1 : Math.pow(10, decimals),
      onUpdate: () => {
        setDisplayValue(obj.value)
      }
    })
    
    return () => {
      if (animRef.current) {
        animRef.current.cancel()
      }
    }
  }, [value, duration, decimals])

  return (
    <span ref={counterRef} className={cn('tabular-nums', className)}>
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  )
}
