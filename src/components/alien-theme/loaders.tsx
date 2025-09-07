'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AlienLoaderProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function AlienLoader({ size = 'md', className }: AlienLoaderProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-20 h-20'
  }

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <motion.div
        className={cn(
          'relative flex items-center justify-center',
          sizeClasses[size]
        )}
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        {/* UFO Shape */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-alien-primary to-alien-accent shadow-alien-glow-lg"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        
        {/* Inner Glow */}
        <motion.div
          className="absolute inset-2 rounded-full bg-alien-primary/50 blur-sm"
          animate={{
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        
        {/* Center Dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-1 bg-white rounded-full" />
        </div>
      </motion.div>
    </div>
  )
}

interface UFOSpinnerProps {
  className?: string
}

export function UFOSpinner({ className }: UFOSpinnerProps) {
  return (
    <div className={cn('relative w-16 h-16', className)}>
      {/* UFO Body */}
      <motion.div
        className="absolute inset-0"
        animate={{
          y: [-2, 2, -2],
          rotate: [0, 360]
        }}
        transition={{
          y: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          },
          rotate: {
            duration: 3,
            repeat: Infinity,
            ease: 'linear'
          }
        }}
      >
        {/* Main Disk */}
        <div className="w-full h-8 bg-gradient-to-r from-alien-secondary via-alien-primary to-alien-secondary rounded-full shadow-alien-glow-lg" />
        
        {/* Dome */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-alien-accent rounded-t-full opacity-80" />
        
        {/* Lights */}
        <div className="absolute bottom-0 left-1/4 w-2 h-2 bg-alien-accent rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-2 h-2 bg-alien-accent rounded-full animate-pulse delay-500" />
      </motion.div>
      
      {/* Light Beam */}
      <motion.div
        className="absolute top-8 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-gradient-to-b from-alien-primary to-transparent"
        animate={{
          opacity: [0.3, 0.8, 0.3],
          scaleX: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </div>
  )
}
