'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, ChevronRight } from 'lucide-react';
import { SECURITY_TIPS } from '@/data/securityTips';

export function SecurityTipsSidebar() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SECURITY_TIPS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass rounded-2xl border p-5">
      <div className="mb-4 flex items-center gap-2">
        <Lightbulb className="h-4 w-4 text-yellow-400" />
        <h3 className="text-sm font-semibold">Security Tip</h3>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm leading-relaxed text-muted-foreground">
            {SECURITY_TIPS[current]?.text}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-1">
          {SECURITY_TIPS.slice(0, 5).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? 'w-4 bg-brand-blue' : 'w-1.5 bg-secondary'
              }`}
            />
          ))}
        </div>
        <span className="text-[10px] text-muted-foreground">
          {current + 1}/{SECURITY_TIPS.length}
        </span>
      </div>
    </div>
  );
}
