"use client"

import React, { useEffect, useRef } from 'react'
import { animate } from 'animejs'
import { stagger } from 'animejs/utils'
import { cn } from '@/lib/utils'

interface AnimatedListProps {
  children: React.ReactNode
  staggerDelay?: number
  animationType?: 'fade' | 'slide' | 'scale' | 'flip'
  className?: string
}

export function AnimatedList({
  children,
  staggerDelay = 100,
  animationType = 'slide',
  className
}: AnimatedListProps) {
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!listRef.current) return

    const items = listRef.current.querySelectorAll('.animated-list-item')

    const animations: Record<string, {
      opacity?: number[];
      translateX?: number[];
      scale?: number[];
      rotateX?: number[];
      duration: number;
      easing: string;
    }> = {
      fade: {
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutQuad'
      },
      slide: {
        opacity: [0, 1],
        translateX: [-30, 0],
        duration: 800,
        easing: 'spring(1, 80, 10, 0)'
      },
      scale: {
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 600,
        easing: 'easeOutElastic(1, .6)'
      },
      flip: {
        opacity: [0, 1],
        rotateX: [-90, 0],
        duration: 800,
        easing: 'easeOutExpo'
      }
    }

    animate(items, {
      ...animations[animationType],
      delay: stagger(staggerDelay)
    })
  }, [children, staggerDelay, animationType])

  return (
    <div ref={listRef} className={cn('space-y-2', className)}>
      {React.Children.map(children, (child) => (
        <div className="animated-list-item opacity-0">{child}</div>
      ))}
    </div>
  )
}
