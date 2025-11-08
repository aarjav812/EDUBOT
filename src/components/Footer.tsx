'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin, Instagram, Mail, MapPin, Phone, 
         BookOpen, Users, Calendar, MessageSquare, Zap, Star } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-indigo-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Enhanced background layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(99,102,241,0.03)_49%,rgba(99,102,241,0.03)_51%,transparent_52%)] bg-[size:40px_40px]" />
      </div>

      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10 mix-blend-screen"
            style={{
              background: `radial-gradient(circle, ${
                ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#EF4444', '#06B6D4', '#8B5CF6', '#10B981', '#F59E0B'][i]
              }, transparent)`,
              width: Math.random() * 400 + 200,
              height: Math.random() * 400 + 200,
              left: `${Math.random() * 120 - 10}%`,
              top: `${Math.random() * 120 - 10}%`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1],
              x: [0, 50, -50, 0],
              y: [0, -30, 30, 0],
            }}
            transition={{
              duration: 25 + i * 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Premium main footer content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            
            {/* Enhanced brand section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Premium logo with effects */}
              <div className="flex items-center space-x-4">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 3, repeat: Infinity }
                  }}
                  className="relative w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl"
                >
                  <BookOpen className="w-8 h-8 text-white drop-shadow-lg" />
                  
                  {/* Floating sparkles around logo */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                      style={{
                        left: `${50 + 40 * Math.cos((i * 60) * Math.PI / 180)}%`,
                        top: `${50 + 40 * Math.sin((i * 60) * Math.PI / 180)}%`,
                      }}
                      animate={{
                        scale: [0, 1.5, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </motion.div>
                
                <div>
                  <motion.h3
                    className="text-3xl font-black text-white bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    style={{ backgroundSize: '200% 200%' }}
                  >
                    EduBot
                  </motion.h3>
                  <p className="text-gray-400 text-sm font-medium">
                    Your AI Academic Assistant
                  </p>
                </div>
              </div>

              {/* Enhanced description */}
              <div className="space-y-6">
                <p className="text-gray-300 text-lg leading-relaxed">
                  Revolutionizing campus life with intelligent conversations, 
                  personalized assistance, and seamless academic support for 
                  students worldwide.
                </p>
                
                {/* Premium stats grid */}
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { number: '50K+', label: 'Active Students', icon: Users, color: 'from-blue-400 to-cyan-400' },
                    { number: '24/7', label: 'Availability', icon: Zap, color: 'from-purple-400 to-pink-400' },
                    { number: '99.9%', label: 'Uptime', icon: Star, color: 'from-green-400 to-blue-400' },
                    { number: '1M+', label: 'Questions Answered', icon: MessageSquare, color: 'from-yellow-400 to-orange-400' }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden"
                    >
                      {/* Animated background gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                          <stat.icon className={`w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300`} />
                          <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                            className={`w-2 h-2 rounded-full bg-gradient-to-r ${stat.color}`}
                          />
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                        <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                          {stat.label}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Enhanced social media with premium effects */}
              <div className="space-y-4">
                <h4 className="text-white font-bold text-lg flex items-center gap-2">
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🌟
                  </motion.span>
                  Connect With Us
                </h4>
                <div className="flex space-x-4">
                  {[
                    { Icon: Github, href: '#', color: 'hover:bg-gray-700', label: 'GitHub' },
                    { Icon: Twitter, href: '#', color: 'hover:bg-blue-600', label: 'Twitter' },
                    { Icon: Linkedin, href: '#', color: 'hover:bg-blue-700', label: 'LinkedIn' },
                    { Icon: Instagram, href: '#', color: 'hover:bg-pink-600', label: 'Instagram' },
                  ].map(({ Icon, href, color, label }) => (
                    <motion.a
                      key={label}
                      href={href}
                      whileHover={{ scale: 1.2, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                      className={`group relative w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center ${color} transition-all duration-300 shadow-lg hover:shadow-xl`}
                    >
                      <Icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                      
                      {/* Tooltip */}
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                        {label}
                      </div>
                      
                      {/* Glow effect */}
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-50 bg-gradient-to-r from-blue-400/20 to-purple-400/20 transition-opacity duration-300" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Enhanced navigation columns */}
            {[
              {
                title: 'Platform',
                icon: BookOpen,
                links: [
                  { name: 'Features', href: '#features' },
                  { name: 'How it Works', href: '#how-it-works' },
                  { name: 'Pricing', href: '#pricing' },
                  { name: 'Integrations', href: '#integrations' },
                  { name: 'API Documentation', href: '#api' },
                ]
              },
              {
                title: 'Support',
                icon: MessageSquare,
                links: [
                  { name: 'Help Center', href: '#help' },
                  { name: 'Contact Us', href: '#contact' },
                  { name: 'Live Chat', href: '#chat' },
                  { name: 'Community', href: '#community' },
                  { name: 'Status Page', href: '#status' },
                ]
              },
              {
                title: 'Company',
                icon: Users,
                links: [
                  { name: 'About Us', href: '#about' },
                  { name: 'Careers', href: '#careers' },
                  { name: 'Press Kit', href: '#press' },
                  { name: 'Blog', href: '#blog' },
                  { name: 'Partnerships', href: '#partners' },
                ]
              },
            ].map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h4 className="text-white font-bold text-lg flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <section.icon className="w-4 h-4 text-white" />
                  </div>
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: linkIndex * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <motion.a
                        href={link.href}
                        whileHover={{ x: 5, color: '#ffffff' }}
                        className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          className="w-1 h-1 bg-blue-400 rounded-full group-hover:bg-purple-400 transition-colors duration-300"
                        />
                        {link.name}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Premium newsletter section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 p-8 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl relative overflow-hidden group hover:bg-white/15 transition-all duration-500"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  📧
                </motion.span>
                Stay Updated with EduBot
              </h3>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Get the latest updates, tips, and exclusive features delivered to your inbox. 
                Join thousands of students already using EduBot to enhance their academic journey.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm shadow-lg transition-all duration-300"
                />
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                >
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ backgroundSize: '200% 200%' }}
                  />
                  
                  <span className="relative flex items-center gap-2">
                    Subscribe
                    <Mail className="w-4 h-4" />
                  </span>
                </motion.button>
              </div>
            </div>

            {/* Floating sparkles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                  style={{
                    left: `${10 + i * 15}%`,
                    top: `${20 + (i % 3) * 20}%`,
                  }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Enhanced bottom section */}
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
            >
              {/* Enhanced copyright */}
              <div className="flex items-center space-x-6">
                <p className="text-gray-400 text-sm">
                  © 2024 EduBot. All rights reserved.
                </p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <motion.a
                    href="#privacy"
                    whileHover={{ color: '#ffffff', scale: 1.05 }}
                    className="hover:text-white transition-all duration-300"
                  >
                    Privacy Policy
                  </motion.a>
                  <span>•</span>
                  <motion.a
                    href="#terms"
                    whileHover={{ color: '#ffffff', scale: 1.05 }}
                    className="hover:text-white transition-all duration-300"
                  >
                    Terms of Service
                  </motion.a>
                  <span>•</span>
                  <motion.a
                    href="#cookies"
                    whileHover={{ color: '#ffffff', scale: 1.05 }}
                    className="hover:text-white transition-all duration-300"
                  >
                    Cookie Policy
                  </motion.a>
                </div>
              </div>

              {/* Enhanced contact info */}
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <motion.div
                  whileHover={{ scale: 1.05, color: '#ffffff' }}
                  className="flex items-center space-x-2 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, color: '#ffffff' }}
                  className="flex items-center space-x-2 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, color: '#ffffff' }}
                  className="flex items-center space-x-2 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>hello@edubot.ai</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}


export default Footer