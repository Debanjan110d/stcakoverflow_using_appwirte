"use client"

import React, { useEffect, useRef } from 'react'
import { animate } from 'animejs'
import { stagger } from 'animejs/utils'
import { cn } from '@/lib/utils'

interface AnimatedLoaderProps {
  variant?: 'dots' | 'wave' | 'pulse' | 'orbit' | 'infinity'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function AnimatedLoader({ 
  variant = 'dots', 
  size = 'md',
  className 
}: AnimatedLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  }

  const dotSizes = {
    sm: 8,
    md: 12,
    lg: 16
  }

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const animations: ReturnType<typeof animate>[] = []

    switch (variant) {
      case 'dots':
        animations.push(animate(container.querySelectorAll('.dot'), {
          scale: [0.8, 1.2],
          opacity: [0.5, 1],
          translateY: [-10, 10],
          duration: 600,
          easing: 'easeInOutQuad',
          delay: stagger(100),
          loop: true,
          direction: 'alternate'
        }))
        break

      case 'wave':
        animations.push(animate(container.querySelectorAll('.bar'), {
          scaleY: [0.5, 1.5],
          duration: 800,
          easing: 'easeInOutSine',
          delay: stagger(80, { from: 'center' }),
          loop: true,
          direction: 'alternate'
        }))
        break

      case 'pulse':
        const pulseRing = container.querySelector('.pulse-ring')
        if (pulseRing) {
          animations.push(animate(pulseRing, {
            scale: [1, 2.5],
            opacity: [1, 0],
            duration: 1500,
            easing: 'easeOutExpo',
            loop: true
          }))
        }
        break

      case 'orbit':
        animations.push(animate(container.querySelectorAll('.orbit-dot'), {
          rotate: '1turn',
          duration: 2000,
          easing: 'linear',
          loop: true
        }))
        break

      case 'infinity':
        const path = container.querySelector('.infinity-path') as SVGPathElement
        if (path) {
          const pathLength = path.getTotalLength()
          path.style.strokeDasharray = `${pathLength}`
          path.style.strokeDashoffset = `${pathLength}`
          animations.push(animate(path, {
            strokeDashoffset: [pathLength, 0],
            easing: 'easeInOutSine',
            duration: 2000,
            loop: true
          }))
        }
        break
    }

    return () => {
      animations.forEach(anim => anim.cancel())
    }
  }, [variant, size])

  return (
    <div
      ref={containerRef}
      className={cn('flex items-center justify-center', sizeClasses[size], className)}
    >
      {variant === 'dots' && (
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="dot rounded-full bg-primary"
              style={{ width: dotSizes[size], height: dotSizes[size] }}
            />
          ))}
        </div>
      )}

      {variant === 'wave' && (
        <div className="flex items-end gap-1.5 h-full">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bar w-2 bg-primary rounded-full"
              style={{ height: '40%', transformOrigin: 'bottom' }}
            />
          ))}
        </div>
      )}

      {variant === 'pulse' && (
        <div className="relative flex items-center justify-center w-full h-full">
          <div className="absolute pulse-ring w-12 h-12 rounded-full border-4 border-primary" />
          <div className="w-6 h-6 rounded-full bg-primary" />
        </div>
      )}

      {variant === 'orbit' && (
        <div className="relative w-full h-full">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="orbit-dot absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: dotSizes[size],
                height: dotSizes[size],
                transformOrigin: `${(i + 1) * 15}px 0px`
              }}
            >
              <div className="w-full h-full rounded-full bg-primary" />
            </div>
          ))}
        </div>
      )}

      {variant === 'infinity' && (
        <svg viewBox="0 0 100 50" className="w-full h-full">
          <path
            className="infinity-path text-primary"
            d="M25 25 C25 15, 35 15, 35 25 C35 35, 45 35, 50 25 C55 15, 65 15, 65 25 C65 35, 75 35, 75 25"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  )
}
