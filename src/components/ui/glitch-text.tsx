"use client"

import React, { useEffect, useRef, useCallback } from 'react'
import { animate } from 'animejs'
import { cn } from '@/lib/utils'

interface GlitchTextProps {
  children: string
  trigger?: 'hover' | 'continuous'
  className?: string
}

export function GlitchText({
  children,
  trigger = 'hover',
  className
}: GlitchTextProps) {
  const textRef = useRef<HTMLSpanElement>(null)

  const glitchAnimation = useCallback(() => {
    if (!textRef.current) return

    const text = textRef.current
    const originalText = children

    animate(text, {
      duration: 300,
      easing: 'easeInOutQuad',
      onUpdate: (anim: { progress: number }) => {
        const progress = anim.progress / 100
        if (progress < 0.8) {
          const glitchChars = '!<>-_\\/[]{}—=+*^?#________'
          const newText = originalText
            .split('')
            .map((char) => {
              if (Math.random() < 0.3) {
                return glitchChars[Math.floor(Math.random() * glitchChars.length)]
              }
              return char
            })
            .join('')
          text.textContent = newText
        } else {
          text.textContent = originalText
        }
      },
      onComplete: () => {
        text.textContent = originalText
      }
    })

    animate(text, {
      translateX: [
        { value: -2, duration: 50 },
        { value: 2, duration: 50 },
        { value: -2, duration: 50 },
        { value: 0, duration: 50 }
      ],
      easing: 'easeInOutQuad'
    })
  }, [children])

  useEffect(() => {
    if (trigger === 'continuous') {
      const interval = setInterval(glitchAnimation, 3000)
      return () => clearInterval(interval)
    }
  }, [trigger, glitchAnimation])

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      glitchAnimation()
    }
  }

  return (
    <span
      ref={textRef}
      className={cn('inline-block cursor-default', className)}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </span>
  )
}
