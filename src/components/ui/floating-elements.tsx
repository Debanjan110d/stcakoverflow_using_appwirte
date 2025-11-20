"use client"

import React, { useEffect, useRef } from 'react'
import { animate } from 'animejs'
import { random } from 'animejs/utils'
import { cn } from '@/lib/utils'

interface FloatingElementsProps {
  count?: number
  variant?: 'dots' | 'squares' | 'stars' | 'mixed'
  className?: string
}

export function FloatingElements({
  count = 15,
  variant = 'dots',
  className
}: FloatingElementsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const elements = container.querySelectorAll('.floating-element')
    const animations: ReturnType<typeof animate>[] = []

    elements.forEach((element, index) => {
      const htmlElement = element as HTMLElement
      
      // Random starting position
      htmlElement.style.left = `${Math.random() * 100}%`
      htmlElement.style.top = `${Math.random() * 100}%`

      // Animate each element
      animations.push(animate(htmlElement, {
        translateX: () => random(-100, 100),
        translateY: () => random(-100, 100),
        scale: [
          { value: random(0.5, 1.5, 1), duration: random(2000, 4000, 0) },
          { value: random(0.5, 1.5, 1), duration: random(2000, 4000, 0) }
        ],
        opacity: [
          { value: random(0.2, 0.8, 1), duration: random(1000, 3000, 0) },
          { value: random(0.2, 0.8, 1), duration: random(1000, 3000, 0) }
        ],
        rotate: () => random(-180, 180),
        duration: random(8000, 15000, 0),
        delay: index * 100,
        easing: 'easeInOutSine',
        loop: true,
        direction: 'alternate'
      }))
    })

    return () => {
      animations.forEach(anim => anim.cancel())
    }
  }, [count])

  const renderShape = (index: number) => {
    const shapes = variant === 'mixed' ? ['dot', 'square', 'star'] : [variant]
    const shape = shapes[index % shapes.length]

    const size = 15 + (index % 10)

    switch (shape) {
      case 'dots':
        return (
          <div
            className="rounded-full bg-primary/30"
            style={{ width: size, height: size }}
          />
        )
      case 'squares':
        return (
          <div
            className="bg-primary/30 rotate-45"
            style={{ width: size, height: size }}
          />
        )
      case 'stars':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" className="text-primary/30">
            <path
              fill="currentColor"
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
        )
      default:
        return (
          <div
            className="rounded-full bg-primary/30"
            style={{ width: size, height: size }}
          />
        )
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}
    >
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="floating-element absolute opacity-0"
        >
          {renderShape(i)}
        </div>
      ))}
    </div>
  )
}
