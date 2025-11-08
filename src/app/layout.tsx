import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EduBot - Your Campus AI Assistant',
  description: 'Get instant answers about deadlines, events, syllabus, and campus life with our intelligent educational chatbot.',
  keywords: ['education', 'chatbot', 'campus', 'AI', 'student', 'assistant'],
  authors: [{ name: 'EduBot Team' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth bg-[#020617]">
      <body className={`${inter.className} antialiased bg-[#020617]`}>
        <div className="min-h-screen">
           {children}
         </div>
      </body>
    </html>
  )
}