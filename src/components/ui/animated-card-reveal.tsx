"use client"

import React, { useEffect, useRef, useState } from 'react'
import { animate } from 'animejs'
import { cn } from '@/lib/utils'

interface AnimatedCardRevealProps {
  children: React.ReactNode
  delay?: number
  direction?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
}

export function AnimatedCardReveal({
  children,
  delay = 0,
  direction = 'bottom',
  className
}: AnimatedCardRevealProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!cardRef.current) return

    const card = cardRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
            
            const translateProps: Record<string, { translateY?: number[]; translateX?: number[] }> = {
              top: { translateY: [-50, 0] },
              bottom: { translateY: [50, 0] },
              left: { translateX: [-50, 0] },
              right: { translateX: [50, 0] }
            }

            animate(card, {
              opacity: [0, 1],
              ...translateProps[direction],
              scale: [0.95, 1],
              duration: 800,
              delay,
              easing: 'spring(1, 80, 10, 0)'
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(card)

    return () => {
      if (card) {
        observer.unobserve(card)
      }
    }
  }, [delay, direction, isVisible])

  return (
    <div ref={cardRef} className={cn('opacity-0', className)}>
      {children}
    </div>
  )
}
