'use client';

import { motion } from 'framer-motion';
import { Clock, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import type { Recommendation } from '@/types';
import { cn } from '@/lib/utils';

const priorityConfig = {
  critical: { icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', glow: 'rgba(239,68,68,0.15)', label: 'Critical' },
  high: { icon: AlertCircle, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', glow: 'rgba(249,115,22,0.15)', label: 'High' },
  medium: { icon: Info, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', glow: 'rgba(234,179,8,0.15)', label: 'Medium' },
  low: { icon: Info, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', glow: 'rgba(59,130,246,0.15)', label: 'Low' },
};

interface RecommendationsListProps {
  recommendations: Recommendation[];
}

export function RecommendationsList({ recommendations }: RecommendationsListProps) {
  const sorted = [...recommendations].sort((a, b) => {
    const order = { critical: 0, high: 1, medium: 2, low: 3 };
    return order[a.priority] - order[b.priority];
  });

  return (
    <div className="space-y-3">
      {sorted.map((rec, i) => {
        const config = priorityConfig[rec.priority];
        const Icon = config.icon;

        return (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.08, duration: 0.4 }}
            whileHover={{
              x: 4,
              boxShadow: `0 0 20px ${config.glow}`,
              transition: { duration: 0.2 },
            }}
            className={cn('glass rounded-2xl border p-4 transition-all duration-200', config.border)}
          >
            <div className="flex items-start gap-4">
              <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl', config.bg)}>
                <Icon className={cn('h-5 w-5', config.color)} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h4 className="font-semibold text-sm">{rec.title}</h4>
                  <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-medium', config.bg, config.color)}>
                    {config.label}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{rec.description}</p>
              </div>

              <div className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{rec.estimatedTime}</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
