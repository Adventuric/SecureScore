'use client';

import { motion } from 'framer-motion';
import { SearchCard } from './SearchCard';

interface HeroSectionProps {
  onSearch: (email: string, username?: string) => void;
  isLoading: boolean;
}

export function HeroSection({ onSearch, isLoading }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl text-center text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl"
      >
        Know if your{' '}
        <span className="gradient-text">digital identity</span>
        {' '}has been exposed.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="mt-5 max-w-xl text-center text-base text-muted-foreground sm:text-lg"
      >
        Check your email and username against known data breaches in seconds.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 w-full max-w-lg"
      >
        <SearchCard onSearch={onSearch} isLoading={isLoading} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-6 text-center text-xs text-muted-foreground/60"
      >
        No sign-up required &middot; Free & anonymous &middot; Privacy-first
      </motion.p>
    </section>
  );
}
