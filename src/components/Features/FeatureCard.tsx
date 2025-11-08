'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  color: string
  index: number
}

const FeatureCard = React.memo(({ icon: Icon, title, description, color, index }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.08,
        ease: 'easeOut'
      }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        y: -10, 
        scale: 1.02,
      }}
      className="group relative cursor-pointer"
    >
      {/* Card glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-20 blur-xl rounded-3xl transition-all duration-500`} />
      
      {/* Main card */}
      <div className="relative h-full p-8 rounded-3xl border border-white/10 backdrop-blur-md bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-500">
        
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-6 shadow-lg`}
        >
          <Icon className="w-8 h-8 text-white" />
        </motion.div>

        {/* Content */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
            {description}
          </p>
        </div>

        {/* Bottom accent */}
        <motion.div
          className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${color} rounded-full transition-all duration-500`}
          initial={{ width: '0%' }}
          whileInView={{ width: '30%' }}
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  )
})

FeatureCard.displayName = 'FeatureCard'

export default FeatureCard
