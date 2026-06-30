'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { getScoreColor } from '@/lib/utils';

interface ScoreCircleProps {
  score: number;
  rating: string;
}

export function ScoreCircle({ score, rating }: ScoreCircleProps) {
  const [size, setSize] = useState(220);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const color = getScoreColor(score);

  const circumference = 2 * Math.PI * 95;
  const offset = circumference - (score / 100) * circumference;

  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth < 640 ? 180 : 220);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const controls = animate(count, score, { duration: 1.5, ease: 'easeOut' });
    return controls.stop;
  }, [score, count]);

  return (
    <div className="relative flex flex-col items-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={95}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={8}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={95}
          fill="none"
          stroke={color}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ filter: `drop-shadow(0 0 8px ${color}40)` }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xs sm:text-sm text-muted-foreground">SecureScore</span>
        <motion.span
          className="text-5xl sm:text-6xl font-bold tabular-nums"
          style={{ color }}
        >
          {rounded}
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-xs sm:text-sm font-medium"
          style={{ color }}
        >
          {rating}
        </motion.span>
      </div>
    </div>
  );
}
