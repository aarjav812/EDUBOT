'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'

interface ChatInputProps {
  inputValue: string
  isTyping: boolean
  onInputChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

const ChatInput = React.memo(({ inputValue, isTyping, onInputChange, onSubmit }: ChatInputProps) => {
  return (
    <div className="border-t border-white/10 p-4 bg-slate-900/60">
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Ask me anything about campus..."
          className="flex-1 bg-slate-800/80 border border-white/10 rounded-2xl px-6 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white p-3 rounded-2xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!inputValue.trim() || isTyping}
        >
          <Send className="w-6 h-6" />
        </motion.button>
      </form>
    </div>
  )
})

ChatInput.displayName = 'ChatInput'

export default ChatInput
