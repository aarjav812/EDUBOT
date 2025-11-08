'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Bot, Sparkles } from 'lucide-react'

const AnimatedLogo = React.memo(() => {
  return (
    <div className="relative group pt-8 pb-4">
      {/* Larger, softer glow that extends beyond the logo bounds */}
      <motion.div className="absolute -inset-12 bg-gradient-to-r from-cyan-400/40 via-blue-500/50 to-violet-500/40 rounded-full blur-3xl opacity-60 mix-blend-plus-lighter pointer-events-none group-hover:opacity-90 transition-opacity duration-500" />
      {/* Secondary inner glow for depth */}
      <motion.div className="absolute -inset-6 bg-gradient-to-r from-cyan-300/30 via-sky-400/40 to-indigo-400/30 rounded-full blur-2xl opacity-50 mix-blend-screen pointer-events-none group-hover:opacity-70 transition-opacity duration-500" />
      <motion.div className="relative w-32 h-32 bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-600 rounded-3xl flex items-center justify-center shadow-2xl backdrop-blur-sm border border-white/20">
        <Bot className="w-16 h-16 text-white" />
      </motion.div>
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${50 + 56 * Math.cos((i * 90 * Math.PI) / 180)}%`,
            top: `${50 + 56 * Math.sin((i * 90 * Math.PI) / 180)}%`,
          }}
          animate={{ rotate: 360, opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4 + i, repeat: Infinity }}
        >
          <Sparkles className="w-4 h-4 text-yellow-400" />
        </motion.div>
      ))}
    </div>
  )
})

AnimatedLogo.displayName = 'AnimatedLogo'

export default AnimatedLogo
