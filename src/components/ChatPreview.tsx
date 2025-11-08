'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Bot, User } from 'lucide-react'

const ChatPreview = () => {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  const chatMessages = [
    {
      type: 'user',
      message: "What's my next assignment deadline?",
      time: '2:30 PM'
    },
    {
      type: 'bot',
      message: "You have a Computer Science project due tomorrow at 11:59 PM, and a History essay due Friday. Would you like me to set reminders?",
      time: '2:30 PM'
    },
    {
      type: 'user', 
      message: "Yes, please set both reminders!",
      time: '2:31 PM'
    },
    {
      type: 'bot',
      message: "Perfect! I've set reminders for both assignments. You'll get notifications 24 hours and 2 hours before each deadline. Good luck! 📚",
      time: '2:31 PM'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentMessage < chatMessages.length) {
        setIsTyping(true)
        setTimeout(() => {
          setCurrentMessage(prev => prev + 1)
          setIsTyping(false)
        }, 1500)
      } else {
        setTimeout(() => {
          setCurrentMessage(0)
        }, 3000)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [currentMessage, chatMessages.length])

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Keep a subtle grid overlay for depth */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px] opacity-40" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400 mb-6 leading-tight">
            See EduBot in Action
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience how EduBot makes academic life easier with intelligent conversations
          </p>
        </div>

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 p-6 border-b border-white/10">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">EduBot</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-gray-300">Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="p-6 space-y-6 min-h-[400px]">
              {chatMessages.slice(0, currentMessage).map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex space-x-3 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                      msg.type === 'user' 
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600' 
                        : 'bg-gradient-to-r from-cyan-500 to-blue-600'
                    }`}>
                      {msg.type === 'user' ? 
                        <User className="w-5 h-5 text-white" /> : 
                        <Bot className="w-5 h-5 text-white" />
                      }
                    </div>
                    <div className={`rounded-2xl p-4 ${
                      msg.type === 'user'
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                        : 'bg-white/10 text-gray-100 border border-white/10'
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.message}</p>
                      <span className="text-xs opacity-70 mt-2 block">{msg.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && currentMessage < chatMessages.length && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-white/10 border border-white/10 rounded-2xl p-4">
                      <div className="flex space-x-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-cyan-400 rounded-full"
                            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-6 border-t border-white/10">
              <div className="flex items-center space-x-4">
                <div className="flex-1 bg-white/5 rounded-2xl border border-white/10 p-4">
                  <input
                    type="text"
                    placeholder="Ask EduBot anything..."
                    className="w-full bg-transparent text-white placeholder-gray-400 outline-none"
                    disabled
                  />
                </div>
                <button className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center hover:scale-105 transition-transform">
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ChatPreview