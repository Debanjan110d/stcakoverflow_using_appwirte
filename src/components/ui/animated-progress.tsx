"use client"

import React, { useEffect, useRef, useMemo } from 'react'
import { animate } from 'animejs'
import { cn } from '@/lib/utils'

interface AnimatedProgressProps {
  value: number
  max?: number
  variant?: 'linear' | 'circular' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  className?: string
}

export function AnimatedProgress({
  value,
  max = 100,
  variant = 'linear',
  size = 'md',
  showValue = false,
  className
}: AnimatedProgressProps) {
  const progressRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<SVGCircleElement>(null)
  const percentage = Math.min((value / max) * 100, 100)

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  }

  const circleSize = useMemo(() => ({
    sm: 60,
    md: 80,
    lg: 120
  }), [])

  useEffect(() => {
    if (variant === 'linear' && progressRef.current) {
      animate(progressRef.current, {
        width: `${percentage}%`,
        duration: 1500,
        easing: 'spring(1, 80, 10, 0)'
      })
    } else if (variant === 'circular' && circleRef.current) {
      const radius = circleSize[size] / 2 - 8
      const circumference = 2 * Math.PI * radius
      const offset = circumference - (percentage / 100) * circumference

      animate(circleRef.current, {
        strokeDashoffset: [circumference, offset],
        duration: 1500,
        easing: 'easeOutExpo'
      })
    } else if (variant === 'gradient' && progressRef.current) {
      animate(progressRef.current, {
        width: `${percentage}%`,
        duration: 1500,
        easing: 'easeOutExpo'
      })
    }
  }, [percentage, variant, size, circleSize])

  if (variant === 'circular') {
    const radius = circleSize[size] / 2 - 8
    const circumference = 2 * Math.PI * radius
    const boxSize = circleSize[size]

    return (
      <div className={cn('relative inline-flex items-center justify-center', className)}>
        <svg width={boxSize} height={boxSize} className="transform -rotate-90">
          <circle
            cx={boxSize / 2}
            cy={boxSize / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-800"
          />
          <circle
            ref={circleRef}
            cx={boxSize / 2}
            cy={boxSize / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            strokeLinecap="round"
            className="text-primary"
          />
        </svg>
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
            {Math.round(percentage)}%
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn('relative w-full', className)}>
      <div className={cn('w-full bg-gray-800 rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          ref={progressRef}
          className={cn(
            'h-full rounded-full',
            variant === 'gradient'
              ? 'bg-linear-to-r from-primary via-purple-500 to-pink-500'
              : 'bg-primary'
          )}
          style={{ width: 0 }}
        />
      </div>
      {showValue && (
        <div className="absolute right-0 -top-6 text-sm font-semibold text-primary">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  )
}
