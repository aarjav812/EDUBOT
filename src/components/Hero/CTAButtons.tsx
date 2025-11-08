'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, ArrowRight, LogIn, UserPlus } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

interface CTAButtonsProps {
  onStartJourney: () => void
  onExploreFeatures: () => void
}

const CTAButtons = React.memo(({ onStartJourney, onExploreFeatures }: CTAButtonsProps) => {
  const { user } = useAuth()
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-10"
    >
      {user ? (
        // Show when logged in
        <>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="btn-premium"
            onClick={onStartJourney}
          >
            <span className="relative flex items-center gap-3">
              <MessageCircle className="w-6 h-6" /> Start Chatting
              <ArrowRight className="w-6 h-6" />
            </span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group px-10 py-5 border-2 border-white/30 text-white font-bold rounded-2xl backdrop-blur-md hover:bg-white/10 hover:border-white/50 transition-all duration-300 relative overflow-hidden"
            onClick={onExploreFeatures}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span className="relative text-lg">Explore Features</span>
          </motion.button>
        </>
      ) : (
        // Show when logged out
        <>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="btn-premium"
            onClick={() => router.push('/signup')}
          >
            <span className="relative flex items-center gap-3">
              <UserPlus className="w-6 h-6" /> Sign Up Free
              <ArrowRight className="w-6 h-6" />
            </span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group px-10 py-5 border-2 border-white/30 text-white font-bold rounded-2xl backdrop-blur-md hover:bg-white/10 hover:border-white/50 transition-all duration-300 relative overflow-hidden"
            onClick={() => router.push('/login')}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span className="relative flex items-center gap-3 text-lg">
              <LogIn className="w-5 h-5" /> Login
            </span>
          </motion.button>
        </>
      )}
    </motion.div>
  )
})

CTAButtons.displayName = 'CTAButtons'

export default CTAButtons
