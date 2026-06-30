'use client';

import { motion } from 'framer-motion';
import type { SecurityHealthCategory } from '@/types';
import { Progress } from '@/components/ui/progress';

interface SecurityHealthBreakdownProps {
  categories: SecurityHealthCategory[];
}

export function SecurityHealthBreakdown({ categories }: SecurityHealthBreakdownProps) {
  return (
    <div className="space-y-5">
      {categories.map((cat, i) => (
        <motion.div
          key={cat.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 + i * 0.12, duration: 0.4 }}
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">{cat.name}</span>
            <motion.span
              className="text-sm tabular-nums"
              style={{ color: cat.color }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 + i * 0.12 }}
            >
              {cat.score}%
            </motion.span>
          </div>
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.0 + i * 0.12, duration: 0.6, ease: 'easeOut' }}
          >
            <Progress value={cat.score} className="h-2.5" style={{ '--progress-color': cat.color } as React.CSSProperties} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
