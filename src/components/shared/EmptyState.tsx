'use client';

import { motion } from 'framer-motion';
import { PartyPopper, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  email: string;
  score: number;
  onBack: () => void;
}

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 400 - 200,
  y: Math.random() * -400 - 100,
  size: Math.random() * 6 + 2,
  color: ['#22c55e', '#3b82f6', '#8b5cf6', '#06b6d4', '#eab308'][Math.floor(Math.random() * 5)],
  delay: Math.random() * 0.5,
}));

export function EmptyState({ email, score, onBack }: EmptyStateProps) {
  return (
    <div className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              left: '50%',
              top: '50%',
            }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: p.x,
              y: p.y,
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 2,
              delay: p.delay,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="mb-8"
      >
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/10 ring-4 ring-emerald-500/20">
          <PartyPopper className="h-12 w-12 text-emerald-400" />
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-2 text-3xl font-bold"
      >
        Great news!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-2 text-center text-lg text-muted-foreground"
      >
        We couldn&apos;t find <span className="font-medium text-foreground">{email}</span> in any known public data breaches.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: 'spring' }}
        className="glass-strong my-6 rounded-full px-8 py-4 text-center"
      >
        <p className="text-sm text-muted-foreground">Your SecureScore</p>
        <p className="text-5xl font-bold text-emerald-400">{score}</p>
        <p className="text-sm text-emerald-400/80">Excellent</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex items-center gap-2 rounded-xl bg-blue-500/10 px-4 py-3 text-sm text-blue-300"
      >
        <ShieldCheck className="h-4 w-4 shrink-0" />
        <span>Continue practicing good cybersecurity habits to stay protected.</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-8"
      >
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Check another email
        </Button>
      </motion.div>
    </div>
  );
}
