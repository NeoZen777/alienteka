'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Menu, User, MapPin, BookOpen, Zap, LogOut, Settings, UserCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GlowEffect } from '@/components/alien-theme/effects'
import { useUIStore } from '@/stores'
import { useAuth } from '@/hooks/useAuth'

export function Header() {
  const { sidebarOpen, setSidebarOpen } = useUIStore()
  const { user, signOut, isAuthenticated } = useAuth()
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    setUserMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-alien-primary/20 bg-alien-dark/95 backdrop-blur supports-[backdrop-filter]:bg-alien-dark/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <GlowEffect color="primary" intensity="medium">
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative">
                <Zap className="h-8 w-8 text-alien-primary" />
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                >
                  <div className="h-8 w-8 border-2 border-alien-accent rounded-full border-dashed opacity-50" />
                </motion.div>
              </div>
              <span className="text-2xl font-bold text-alien-primary font-orbitron tracking-wider">
                ALIENTEKA
              </span>
            </motion.div>
          </GlowEffect>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/articles"
            className="text-alien-light hover:text-alien-primary transition-colors duration-200 flex items-center space-x-1"
          >
            <BookOpen className="h-4 w-4" />
            <span>Articles</span>
          </Link>
          <Link
            href="/map"
            className="text-alien-light hover:text-alien-primary transition-colors duration-200 flex items-center space-x-1"
          >
            <MapPin className="h-4 w-4" />
            <span>Map</span>
          </Link>
          <Link
            href="/sightings"
            className="text-alien-light hover:text-alien-primary transition-colors duration-200 flex items-center space-x-1"
          >
            <Zap className="h-4 w-4" />
            <span>Sightings</span>
          </Link>
        </nav>

        {/* Search and Auth */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-alien-light/50" />
            <Input
              type="search"
              placeholder="Search ALIENTEKA..."
              className="pl-10 w-64 bg-alien-dark/50 border-alien-primary/30 focus:border-alien-primary"
            />
          </div>
          
          {/* User Authentication */}
          {isAuthenticated ? (
            <div className="relative">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="relative border border-alien-primary/30 hover:border-alien-primary hover:bg-alien-primary/10"
              >
                <UserCircle className="h-5 w-5 text-alien-primary" />
                {user && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-alien-accent rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </Button>

              {/* User Dropdown Menu */}
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-64 bg-alien-dark/95 backdrop-blur border border-alien-primary/30 rounded-lg shadow-[0_0_20px_rgba(0,255,0,0.3)] z-50"
                >
                  <div className="p-4 border-b border-alien-primary/20">
                    <p className="text-alien-primary font-semibold">
                      🛸 Agente Activo
                    </p>
                    <p className="text-alien-light/70 text-sm truncate">
                      {user?.user_metadata?.username || user?.email}
                    </p>
                  </div>
                  
                  <div className="p-2">
                    <Link href="/dashboard">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-alien-light hover:text-alien-primary hover:bg-alien-primary/10"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Panel de Control
                      </Button>
                    </Link>
                    
                    <Link href="/profile">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-alien-light hover:text-alien-primary hover:bg-alien-primary/10"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Mi Perfil
                      </Button>
                    </Link>
                    
                    <div className="border-t border-alien-primary/20 my-2"></div>
                    
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-400/10"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Cerrar Transmisión
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/auth/login">
                <Button 
                  variant="ghost" 
                  className="text-alien-light hover:text-alien-primary border border-alien-primary/30 hover:border-alien-primary"
                >
                  🛸 Iniciar Sesión
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-alien-primary hover:bg-alien-accent text-black font-bold shadow-[0_0_20px_rgba(0,255,0,0.3)]">
                  🚀 Unirse
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-alien-primary/20 bg-alien-dark">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-alien-primary" />
              <span className="text-lg font-bold text-alien-primary font-orbitron">
                ALIENTEKA
              </span>
            </div>
            <p className="text-alien-light/70 text-sm">
              The ultimate digital encyclopedia for UFO phenomena, extraterrestrial life, and ufology research.
            </p>
          </div>

          {/* Explore */}
          <div className="space-y-4">
            <h3 className="text-alien-primary font-semibold">Explore</h3>
            <div className="space-y-2 text-sm">
              <Link href="/articles" className="block text-alien-light/70 hover:text-alien-primary transition-colors">
                Encyclopedia Articles
              </Link>
              <Link href="/map" className="block text-alien-light/70 hover:text-alien-primary transition-colors">
                Sightings Map
              </Link>
              <Link href="/categories" className="block text-alien-light/70 hover:text-alien-primary transition-colors">
                Categories
              </Link>
              <Link href="/timeline" className="block text-alien-light/70 hover:text-alien-primary transition-colors">
                Timeline
              </Link>
            </div>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="text-alien-primary font-semibold">Community</h3>
            <div className="space-y-2 text-sm">
              <Link href="/contribute" className="block text-alien-light/70 hover:text-alien-primary transition-colors">
                Contribute
              </Link>
              <Link href="/report" className="block text-alien-light/70 hover:text-alien-primary transition-colors">
                Report Sighting
              </Link>
              <Link href="/forum" className="block text-alien-light/70 hover:text-alien-primary transition-colors">
                Forum
              </Link>
              <Link href="/researchers" className="block text-alien-light/70 hover:text-alien-primary transition-colors">
                Researchers
              </Link>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <h3 className="text-alien-primary font-semibold">Information</h3>
            <div className="space-y-2 text-sm">
              <Link href="/about" className="block text-alien-light/70 hover:text-alien-primary transition-colors">
                About ALIENTEKA
              </Link>
              <Link href="/methodology" className="block text-alien-light/70 hover:text-alien-primary transition-colors">
                Research Methodology
              </Link>
              <Link href="/privacy" className="block text-alien-light/70 hover:text-alien-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-alien-light/70 hover:text-alien-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-alien-primary/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-alien-light/50 text-sm">
              © 2025 ALIENTEKA. All rights reserved. The truth is out there.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <motion.div
                className="text-alien-light/30 text-xs"
                animate={{
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                🛸 Contact established
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
