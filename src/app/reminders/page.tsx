'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell } from 'lucide-react';

export default function RemindersPage() {
  const router = useRouter();
  const { user, token } = useAuth();

  useEffect(() => {
    if (!user && !token) {
      router.push('/login');
    }
  }, [user, token, router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
        >
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => router.push('/chat')}
              className="flex items-center gap-2 text-white hover:text-purple-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Chat
            </button>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Bell className="w-8 h-8" />
              Reminders
            </h1>
            <div className="w-24"></div>
          </div>

          <div className="text-center text-white/60 py-16">
            <Bell className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-xl">Reminders feature coming soon!</p>
            <p className="mt-2">You&apos;ll be able to create and manage your study reminders here.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
