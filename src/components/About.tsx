'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Target, Users, Award } from 'lucide-react'

const About = () => {
  const stats = [
    { icon: Users, number: '10K+', label: 'Active Students', color: 'text-cyan-400' },
    { icon: GraduationCap, number: '500+', label: 'Universities', color: 'text-sky-400' },
    { icon: Target, number: '95%', label: 'Success Rate', color: 'text-indigo-400' },
    { icon: Award, number: '24/7', label: 'Support', color: 'text-blue-400' },
  ]

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Keep a subtle grid overlay for depth */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px] opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400 mb-8 leading-tight">
              Empowering Student Success
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              EduBot isn&apos;t just another chatbot – it&apos;s your intelligent academic companion, 
              designed to understand the unique challenges of student life and provide 
              personalized solutions that help you thrive.
            </p>

            <div className="space-y-6">
              {[
                'Instant access to campus information and resources',
                'Personalized academic guidance and recommendations',
                'Real-time notifications for important deadlines',
                'Seamless integration with your university systems'
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-4"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative"
              >
                <div className="relative p-8 rounded-3xl border border-white/10 backdrop-blur-md bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-500">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="text-center">
                    <div className={`text-4xl font-black ${stat.color} mb-2`}>
                      {stat.number}
                    </div>
                    <div className="text-gray-300 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About