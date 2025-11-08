'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, ArrowLeft, Sparkles, LogOut, User, Menu } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import api from '@/lib/api'
import MessageBubble from '@/components/Chat/MessageBubble'
import TypingIndicator from '@/components/Chat/TypingIndicator'
import ChatInput from '@/components/Chat/ChatInput'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const INITIAL_MESSAGE: Message = {
  id: '1',
  text: "Hello! I'm EduBot, your intelligent AI companion. I can help you study, explain concepts, create study plans, and set reminders. How can I assist you today?",
  sender: 'bot',
  timestamp: new Date(),
}

const QUICK_SUGGESTIONS = [
  'Help me study for exams',
  'Explain a difficult concept',
  'Create a study plan',
  'Set a reminder for homework',
]

export default function ChatPage() {
  const router = useRouter()
  const { user, token, logout } = useAuth()
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [conversationId] = useState(() => `conv_${Date.now()}`)
  const [showMenu, setShowMenu] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Redirect if not logged in
  useEffect(() => {
    if (!user && !token) {
      router.push('/login')
    }
  }, [user, token, router])

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const handleSendMessage = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isTyping || !token) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue('')
    setIsTyping(true)

    try {
      // Call the real AI backend
      const response = await api.chat.sendMessage(currentInput, conversationId, token)
      
      if (response.success && response.data?.assistantMessage) {
        const botMessage: Message = {
          id: response.data.assistantMessage._id || (Date.now() + 1).toString(),
          text: response.data.assistantMessage.content,
          sender: 'bot',
          timestamp: new Date(response.data.assistantMessage.createdAt || Date.now()),
        }
        setMessages((prev) => [...prev, botMessage])
      } else {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response.message || "I'm sorry, I encountered an error. Please try again.",
          sender: 'bot',
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, errorMessage])
      }
    } catch (error: any) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: error.message || "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }, [inputValue, isTyping, token, conversationId])

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setInputValue(suggestion)
  }, [])

  const handleLogout = () => {
    logout()
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Optimized animated background - reduced complexity */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(34,211,238,0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
            top: '10%',
            left: '20%',
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
            bottom: '10%',
            right: '20%',
          }}
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="relative z-10 bg-slate-900/50 backdrop-blur-xl border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back to Home</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="relative">
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur-lg opacity-50"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">EduBot AI</h1>
                <p className="text-xs text-white/60">Powered by {process.env.NEXT_PUBLIC_AI_PROVIDER || 'AI'}</p>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline text-sm">{user.name}</span>
                <Menu className="w-4 h-4" />
              </button>

              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 bg-slate-800/90 backdrop-blur-lg rounded-lg border border-white/10 overflow-hidden shadow-xl z-50"
                >
                  <button
                    onClick={() => {
                      setShowMenu(false)
                      router.push('/reminders')
                    }}
                    className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Reminders
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left text-red-300 hover:bg-white/10 transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Chat Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col h-[calc(100vh-180px)]">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <ChatInput 
            inputValue={inputValue}
            isTyping={isTyping}
            onInputChange={setInputValue}
            onSubmit={handleSendMessage}
          />
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex flex-wrap gap-2 justify-center"
        >
          {QUICK_SUGGESTIONS.map((suggestion, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 bg-slate-800/60 border border-white/10 text-white/80 text-sm rounded-full hover:bg-slate-700/60 hover:text-white transition-all backdrop-blur-sm"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-3 h-3" />
                {suggestion}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </main>
  )
}
