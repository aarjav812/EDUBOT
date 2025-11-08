'use client'

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Calendar, BookOpen, Bell, Users, MessageSquare, Brain } from 'lucide-react'
import FeatureCard from './Features/FeatureCard'

const Features = React.memo(() => {
  const features = useMemo(() => [
    {
      icon: Calendar,
      title: 'Event Calendar',
      description: 'Never miss important campus events, lectures, or deadlines with smart reminders.',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      icon: BookOpen,
      title: 'Syllabus Assistant',
      description: 'Get instant access to course syllabi, reading materials, and assignment details.',
      color: 'from-sky-500 to-indigo-600',
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Receive personalized alerts for assignments, exams, and important announcements.',
      color: 'from-blue-500 to-violet-600',
    },
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Get intelligent study recommendations and academic guidance tailored to you.',
      color: 'from-indigo-500 to-cyan-600',
    },
    {
      icon: MessageSquare,
      title: '24/7 Chat Support',
      description: 'Ask questions anytime and get instant answers about campus life and academics.',
      color: 'from-violet-500 to-sky-600',
    },
    {
      icon: Users,
      title: 'Community Hub',
      description: 'Connect with classmates, join study groups, and collaborate on projects.',
      color: 'from-cyan-500 to-indigo-600',
    },
  ], [])

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      {/* Keep a subtle grid overlay for depth */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px] opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400 mb-6 leading-tight">
            Powerful Features
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover how EduBot transforms your academic experience with intelligent features
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
})

Features.displayName = 'Features'

export default Features
