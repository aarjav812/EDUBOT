'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const MouseFollower = React.memo(() => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY })
    }
    window.addEventListener('mousemove', updateMousePosition)
    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])

  return (
    <motion.div
      className="absolute w-[480px] h-[480px] rounded-full opacity-20 mix-blend-screen pointer-events-none"
      style={{
        background:
          'radial-gradient(circle, rgba(34,211,238,0.35) 0%, rgba(99,102,241,0.25) 50%, transparent 70%)',
        filter: 'blur(50px)',
      }}
      animate={{ x: mousePosition.x - 240, y: mousePosition.y - 240 }}
      transition={{ type: 'spring', damping: 30, stiffness: 200 }}
    />
  )
})

MouseFollower.displayName = 'MouseFollower'

export default MouseFollower
