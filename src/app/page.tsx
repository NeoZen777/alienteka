'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, BookOpen, Zap, Search, Users, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { GlowEffect, NeonBorder, PulseGlow } from '@/components/alien-theme/effects'
import { UFOSpinner } from '@/components/alien-theme/loaders'

export default function Home() {
  const featuredArticles = [
    {
      title: "The Roswell Incident: 75 Years Later",
      excerpt: "A comprehensive analysis of the most famous UFO case in history",
      category: "Historical Cases",
      readTime: "8 min read"
    },
    {
      title: "Pentagon UFO Videos: Scientific Analysis", 
      excerpt: "Breaking down the official military UAP footage",
      category: "Recent Disclosure",
      readTime: "12 min read"
    },
    {
      title: "The Fermi Paradox Explained",
      excerpt: "Where is everybody? Exploring the great cosmic silence",
      category: "Science & Theory",
      readTime: "15 min read"
    }
  ]

  const stats = [
    { label: "Documented Sightings", value: "15,847" },
    { label: "Research Articles", value: "2,341" },
    { label: "Active Researchers", value: "8,923" },
    { label: "Countries Covered", value: "193" }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <GlowEffect intensity="high" color="primary">
              <h1 className="text-5xl md:text-7xl font-bold text-alien-primary font-orbitron mb-6 leading-tight">
                THE TRUTH IS
                <br />
                <span className="text-alien-accent neon-text">OUT THERE</span>
              </h1>
            </GlowEffect>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-alien-light/80 mb-8 max-w-2xl mx-auto"
            >
              Explore the most comprehensive digital encyclopedia of UFO phenomena, 
              extraterrestrial research, and unexplained cosmic mysteries.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-alien-light/50" />
                <Input
                  type="search"
                  placeholder="Search cases, sightings, research..."
                  className="pl-10 h-12 text-lg"
                />
              </div>
              <Button variant="alien" size="lg" className="h-12 px-8">
                <Search className="mr-2 h-5 w-5" />
                Investigate
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link href="/articles">
                <Button variant="neon" size="lg">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Explore Encyclopedia
                </Button>
              </Link>
              <Link href="/map">
                <Button variant="outline" size="lg">
                  <MapPin className="mr-2 h-5 w-5" />
                  View Sightings Map
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating UFO Animation */}
        <motion.div
          className="absolute top-20 right-10 hidden lg:block"
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 360]
          }}
          transition={{
            y: {
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            },
            rotate: {
              duration: 20,
              repeat: Infinity,
              ease: 'linear'
            }
          }}
        >
          <UFOSpinner />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-alien-dark/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <PulseGlow>
                  <div className="text-3xl md:text-4xl font-bold text-alien-primary font-orbitron mb-2">
                    {stat.value}
                  </div>
                </PulseGlow>
                <div className="text-alien-light/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-alien-primary font-orbitron mb-4">
              Featured Research
            </h2>
            <p className="text-alien-light/70 max-w-2xl mx-auto">
              Dive deep into the most compelling cases and cutting-edge research 
              in ufology and extraterrestrial studies.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredArticles.map((article, index) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <NeonBorder>
                  <Card variant="alien" className="h-full hover:scale-105 transition-transform duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-alien-accent bg-alien-accent/10 px-2 py-1 rounded">
                          {article.category}
                        </span>
                        <span className="text-xs text-alien-light/50">
                          {article.readTime}
                        </span>
                      </div>
                      <CardTitle className="text-xl">{article.title}</CardTitle>
                      <CardDescription>{article.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="ghost" className="w-full justify-between">
                        Read Article
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </NeonBorder>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Features */}
      <section className="py-20 px-4 bg-alien-dark/20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<MapPin className="h-8 w-8" />}
              title="Interactive Map"
              description="Explore UFO sightings worldwide with our advanced mapping system"
              href="/map"
            />
            <FeatureCard
              icon={<BookOpen className="h-8 w-8" />}
              title="Encyclopedia"
              description="Access thousands of research articles and case studies"
              href="/articles"
            />
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="Community"
              description="Connect with researchers and contribute your own findings"
              href="/community"
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Verified Data"
              description="All content is thoroughly researched and fact-checked"
              href="/methodology"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <NeonBorder animated>
            <div className="p-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-alien-primary font-orbitron mb-6">
                  🛸 Únete a la Investigación Galáctica
                </h2>
                <p className="text-alien-light/80 mb-8 max-w-2xl mx-auto">
                  Conviértete en parte del esfuerzo colaborativo más grande para documentar y 
                  entender los fenómenos extraterrestres. Tu contribución es vital para revelar la verdad.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/auth/register">
                    <Button variant="alien" size="lg" className="w-full sm:w-auto">
                      <Users className="mr-2 h-5 w-5" />
                      🚀 Unirse a la Misión
                    </Button>
                  </Link>
                  <Link href="/auth/login">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      <Zap className="mr-2 h-5 w-5" />
                      🛸 Iniciar Sesión
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </NeonBorder>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description, href }: {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <GlowEffect hover>
          <Card variant="alien" className="p-6 text-center h-full cursor-pointer">
            <div className="text-alien-primary mb-4 flex justify-center">
              {icon}
            </div>
            <h3 className="text-xl font-semibold text-alien-primary mb-2 font-orbitron">
              {title}
            </h3>
            <p className="text-alien-light/70 text-sm">
              {description}
            </p>
          </Card>
        </GlowEffect>
      </motion.div>
    </Link>
  )
}
