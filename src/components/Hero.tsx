"use client";

import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import AnimatedLogo from "./Hero/AnimatedLogo";
import CTAButtons from "./Hero/CTAButtons";

// Lazy load mouse follower for better performance
const MouseFollower = dynamic(() => import("./Hero/MouseFollower"), {
  ssr: false,
});

const Hero = React.memo(() => {
  const router = useRouter();

  const scrollToFeatures = useCallback(() => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleStartJourney = useCallback(() => {
    router.push('/chat');
  }, [router]);

  return (
    <section className="relative min-h-[88vh] md:min-h-[92vh] flex items-center justify-center overflow-hidden" style={{marginTop: '-200px'}}>
      {/* Light single mouse follower to add interactivity without conflicts */}
      <MouseFollower />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center -mt-4 md:-mt-8 lg:-mt-12 pb-24 md:pb-28">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-12 relative" 
          style={{paddingTop: '200px'}}
        >
          <AnimatedLogo />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400 leading-tight drop-shadow-[0_0_18px_rgba(14,165,233,0.35)]"
        >
          Meet{" "}
          <motion.span
            className="inline-block bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(14,165,233,0.45)]"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{ backgroundSize: "200% 200%" }}
          >
            EduBot
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 text-[1.25rem] md:text-3xl text-gray-100 font-light leading-relaxed max-w-4xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] backdrop-blur-[1px]"
        >
          Your intelligent campus companion for deadlines, events, syllabus, and more.
        </motion.p>

        {/* CTA */}
        <CTAButtons 
          onStartJourney={handleStartJourney}
          onExploreFeatures={scrollToFeatures}
        />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2"
        />
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
