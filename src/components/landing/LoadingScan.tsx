'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Search, CheckCircle2 } from 'lucide-react';
import { LOADING_MESSAGES } from '@/lib/constants';

interface LoadingScanProps {
  onComplete: () => void;
}

export function LoadingScan({ onComplete }: LoadingScanProps) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const advanceStep = useCallback(() => {
    if (step < LOADING_MESSAGES.length - 1) {
      setCompletedSteps((prev) => [...prev, step]);
      setStep((s) => s + 1);
    } else {
      setCompletedSteps((prev) => [...prev, step]);
      setTimeout(() => {
        onComplete();
      }, 600);
    }
  }, [step, onComplete]);

  useEffect(() => {
    const timings = [1000, 1200, 1000, 1100];
    const timer = setTimeout(advanceStep, timings[Math.min(step, timings.length - 1)]);
    return () => clearTimeout(timer);
  }, [step, advanceStep]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#060618]/95 backdrop-blur-sm"
    >
      <div className="relative mb-12">
        <motion.div
          className="h-24 w-24 rounded-full border-2 border-brand-blue/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-0 rounded-full border-t-2 border-brand-blue/60" style={{ clipPath: 'inset(0 0 50% 0)' }} />
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Shield className="h-10 w-10 text-brand-blue" />
        </motion.div>
      </div>

      <div className="space-y-4">
        {LOADING_MESSAGES.map((msg, i) => (
          <div key={i} className="flex items-center gap-3">
            {completedSteps.includes(i) ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              </motion.div>
            ) : i === step ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Search className="h-5 w-5 text-brand-blue" />
              </motion.div>
            ) : (
              <div className="h-5 w-5 rounded-full border border-white/10" />
            )}

            <span
              className={`text-sm transition-colors duration-300 ${
                completedSteps.includes(i)
                  ? 'text-emerald-400'
                  : i === step
                  ? 'text-foreground'
                  : 'text-muted-foreground/40'
              }`}
            >
              {msg}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
