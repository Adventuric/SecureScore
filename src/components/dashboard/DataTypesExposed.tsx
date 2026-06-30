'use client';

import { motion } from 'framer-motion';
import { Lock, Mail, Phone, MapPin, User, Globe, CreditCard, FileBadge } from 'lucide-react';
import type { DataTypeStatus } from '@/types';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Lock, Mail, Phone, MapPin, User, Globe, CreditCard, FileBadge,
};

interface DataTypesExposedProps {
  dataTypes: DataTypeStatus[];
}

export function DataTypesExposed({ dataTypes }: DataTypesExposedProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {dataTypes.map((dt, i) => {
        const Icon = iconMap[dt.icon as keyof typeof iconMap] || Lock;

        return (
          <motion.div
            key={dt.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + i * 0.08, duration: 0.3 }}
            className={cn(
              'flex items-center gap-3 rounded-xl border p-3.5 transition-all duration-200',
              dt.exposed
                ? 'border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-emerald-500/0'
                : 'border-red-500/20 bg-gradient-to-br from-red-500/5 to-red-500/0'
            )}
          >
            <div className={cn(
              'flex h-9 w-9 items-center justify-center rounded-lg',
              dt.exposed ? 'bg-emerald-500/10' : 'bg-red-500/10'
            )}>
              <Icon className={cn('h-4 w-4 md:h-4.5 md:w-4.5', dt.exposed ? 'text-emerald-400' : 'text-red-400')} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{dt.name}</p>
              <p className={cn('text-xs', dt.exposed ? 'text-emerald-400/80' : 'text-red-400/80')}>
                {dt.exposed ? 'Safe' : 'Exposed'}
              </p>
            </div>
            <div className={cn(
              'h-2.5 w-2.5 rounded-full ring-2',
              dt.exposed
                ? 'bg-emerald-400 ring-emerald-400/20'
                : 'bg-red-400 ring-red-400/20'
            )} />
          </motion.div>
        );
      })}
    </div>
  );
}
