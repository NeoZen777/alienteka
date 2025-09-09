'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlowEffectProps {
  children: React.ReactNode
  intensity?: 'low' | 'medium' | 'high'
  color?: 'primary' | 'accent' | 'cyan'
  className?: string
  hover?: boolean
}

export function GlowEffect({ 
  children, 
  color = 'primary',
  className,
  hover = true 
}: GlowEffectProps) {
  const colorClasses = {
    primary: 'shadow-[0_0_20px_#00FF00]',
    accent: 'shadow-[0_0_20px_#39FF14]',
    cyan: 'shadow-[0_0_20px_#00FFFF]'
  }

  const hoverClasses = hover ? {
    primary: 'hover:shadow-[0_0_30px_#00FF00,0_0_40px_#00FF00]',
    accent: 'hover:shadow-[0_0_30px_#39FF14,0_0_40px_#39FF14]',
    cyan: 'hover:shadow-[0_0_30px_#00FFFF,0_0_40px_#00FFFF]'
  } : {}

  return (
    <motion.div
      className={cn(
        'transition-all duration-300',
        colorClasses[color],
        hover && hoverClasses[color],
        className
      )}
      whileHover={hover ? { scale: 1.02 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

interface NeonBorderProps {
  children: React.ReactNode
  className?: string
  animated?: boolean
}

export function NeonBorder({ children, className, animated = false }: NeonBorderProps) {
  return (
    <motion.div
      className={cn(
        'relative p-0.5 rounded-lg bg-gradient-to-r from-alien-primary via-alien-accent to-alien-primary',
        animated && 'bg-gradient-to-r from-alien-primary via-alien-accent to-alien-primary bg-[length:200%_200%]',
        className
      )}
      animate={animated ? {
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
      } : undefined}
      transition={animated ? {
        duration: 3,
        repeat: Infinity,
        ease: 'linear'
      } : undefined}
    >
      <div className="relative bg-alien-dark rounded-md h-full w-full p-4">
        {children}
      </div>
    </motion.div>
  )
}

interface PulseGlowProps {
  children: React.ReactNode
  className?: string
  color?: 'green' | 'blue' | 'red'
}

export function PulseGlow({ children, className, color = 'green' }: PulseGlowProps) {
  const colorMap = {
    green: '#00FF00',
    blue: '#00FFFF', 
    red: '#FF0000'
  }

  return (
    <motion.div
      className={className}
      animate={{
        boxShadow: [
          `0 0 5px ${colorMap[color]}`,
          `0 0 20px ${colorMap[color]}, 0 0 30px ${colorMap[color]}`,
          `0 0 5px ${colorMap[color]}`
        ]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {children}
    </motion.div>
  )
}

interface MatrixRainProps {
  className?: string
  density?: 'low' | 'medium' | 'high'
}

// Hoist density map to avoid recreating reference and satisfy exhaustive-deps rule implicitly
const MATRIX_DENSITY: Record<NonNullable<MatrixRainProps['density']>, number> = {
  low: 20,
  medium: 40,
  high: 60,
}

export function MatrixRain({ className, density = 'medium' }: MatrixRainProps) {

  const characters = '0123456789ABCDEFアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
  
  type RainItem = {
    left: string
    delay: number
    duration: number
    char: string
  }

  const [items, setItems] = useState<RainItem[]>([])

  // Generate animation parameters only after mount to avoid SSR/client mismatch
  useEffect(() => {
  const count = MATRIX_DENSITY[density]
    const next: RainItem[] = Array.from({ length: count }).map(() => {
      const delay = Math.random() * 5
      const duration = Math.random() * 3 + 2
      const left = `${Math.random() * 100}%`
      const char = characters.charAt(Math.floor(Math.random() * characters.length))
      return { left, delay, duration, char }
    })
    setItems(next)
  }, [density])
  
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-alien-primary font-mono text-xs opacity-20"
          style={{
            left: item.left,
            animationDelay: `${item.delay}s`
          }}
          animate={{
            y: ['-100vh', '100vh'],
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: item.delay
          }}
        >
          {item.char}
        </motion.div>
      ))}
    </div>
  )
}
