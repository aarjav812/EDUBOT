'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import Features from '@/components/Features'

// Lazy load components that are below the fold
const About = dynamic(() => import('@/components/About'), {
  loading: () => null,
})
const ChatPreview = dynamic(() => import('@/components/ChatPreview'), {
  loading: () => null,
})
const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => null,
})

// Lazy load 3D background for better initial load
const BackgroundScene = dynamic(() => import('@/components/BackgroundScene'), {
  ssr: false,
  loading: () => null,
})

export default function Home() {
  return (
    <main className="relative">
      {/* Global 3D background */}
      <BackgroundScene />
      {/* Foreground sections */}
      <Hero />
      <Features />
      <About />
      <ChatPreview />
      <Footer />
    </main>
  )
}
