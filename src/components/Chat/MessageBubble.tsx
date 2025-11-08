'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Bot, User } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

interface MessageBubbleProps {
  message: Message
}

const MessageBubble = React.memo(({ message }: MessageBubbleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex gap-3 ${
        message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          message.sender === 'bot'
            ? 'bg-gradient-to-br from-cyan-500 to-blue-600'
            : 'bg-gradient-to-br from-violet-500 to-indigo-600'
        }`}
      >
        {message.sender === 'bot' ? (
          <Bot className="w-5 h-5 text-white" />
        ) : (
          <User className="w-5 h-5 text-white" />
        )}
      </div>

      {/* Message Bubble */}
      <div
        className={`flex flex-col max-w-[70%] ${
          message.sender === 'user' ? 'items-end' : 'items-start'
        }`}
      >
        <div
          className={`px-4 py-3 rounded-2xl ${
            message.sender === 'bot'
              ? 'bg-slate-800/80 text-white border border-white/10'
              : 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white'
          }`}
        >
          <p className="text-sm whitespace-pre-line">{message.text}</p>
        </div>
        <span className="text-xs text-white/40 mt-1 px-2">
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </motion.div>
  )
})

MessageBubble.displayName = 'MessageBubble'

export default MessageBubble
