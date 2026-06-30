'use client';

import { motion } from 'framer-motion';
import { Calendar, Shield, Copy } from 'lucide-react';
import type { BreachResult } from '@/types';
import { formatDateShort, cn } from '@/lib/utils';
import { SEVERITY_COLORS } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface BreachTimelineProps {
  breaches: BreachResult[];
}

export function BreachTimeline({ breaches }: BreachTimelineProps) {
  if (breaches.length === 0) return null;

  const sorted = [...breaches].sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const copyBreachDetails = (breach: BreachResult) => {
    const details = [
      `Breach: ${breach.name}`,
      `Date: ${formatDateShort(breach.date)}`,
      `Severity: ${breach.severity}`,
      `Exposed Data: ${breach.dataClasses.join(', ')}`,
    ].join('\n');
    navigator.clipboard.writeText(details);
    toast.success('Breach details copied');
  };

  return (
    <TooltipProvider>
      <div className="relative">
        <div className="absolute left-[15px] top-0 h-full w-[2px] bg-gradient-to-b from-brand-blue/40 via-brand-purple/40 to-transparent md:left-[19px]" />

        <div className="space-y-4 md:space-y-6">
          {sorted.map((breach, i) => (
            <motion.div
              key={`${breach.name}-${i}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
              className="relative pl-10 md:pl-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 + i * 0.1, type: 'spring', stiffness: 300 }}
                className={cn(
                  'absolute left-[6px] flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 md:left-[10px] md:h-5 md:w-5',
                  breach.severity === 'critical' ? 'border-red-500 bg-red-500/20' :
                  breach.severity === 'high' ? 'border-orange-500 bg-orange-500/20' :
                  breach.severity === 'medium' ? 'border-yellow-500 bg-yellow-500/20' :
                  'border-slate-500 bg-slate-500/20'
                )}
              >
                <div className={cn(
                  'h-1.5 w-1.5 rounded-full md:h-2 md:w-2',
                  breach.severity === 'critical' ? 'bg-red-500' :
                  breach.severity === 'high' ? 'bg-orange-500' :
                  breach.severity === 'medium' ? 'bg-yellow-500' :
                  'bg-slate-500'
                )} />
              </motion.div>

              <div
                className={cn(
                  'glass rounded-xl md:rounded-2xl border p-3 md:p-5 transition-all duration-200 hover:shadow-lg',
                  breach.severity === 'critical' ? 'border-red-500/20' :
                  breach.severity === 'high' ? 'border-orange-500/20' : ''
                )}
              >
                <div className="flex items-start justify-between gap-3 md:gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="flex h-7 w-7 md:h-8 md:w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-blue/20 to-brand-purple/20">
                        <Shield className="h-3.5 w-3.5 md:h-4 md:w-4 text-brand-blue" />
                      </div>
                      <div>
                        <h4 className="text-sm md:text-base font-semibold truncate">{breach.name}</h4>
                        <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDateShort(breach.date)}</span>
                        </div>
                      </div>
                    </div>
                    {breach.description && (
                      <p className="mt-1.5 md:mt-2 text-xs md:text-sm leading-relaxed text-muted-foreground line-clamp-2 md:line-clamp-none">
                        {breach.description}
                      </p>
                    )}
                    <div className="mt-2 md:mt-3 flex flex-wrap gap-1 md:gap-1.5">
                      {breach.dataClasses.slice(0, 4).map((dc) => (
                        <Badge key={dc} variant="secondary" className="text-[9px] md:text-[10px] px-1.5 md:px-2.5">
                          {dc}
                        </Badge>
                      ))}
                      {breach.dataClasses.length > 4 && (
                        <Badge variant="secondary" className="text-[9px] md:text-[10px]">
                          +{breach.dataClasses.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 md:gap-2 shrink-0">
                    <span className={cn('rounded-full border px-1.5 md:px-2.5 py-0.5 text-[9px] md:text-[10px] font-medium capitalize', SEVERITY_COLORS[breach.severity])}>
                      {breach.severity}
                    </span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => copyBreachDetails(breach)}
                          className="rounded-lg p-1 md:p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                        >
                          <Copy className="h-3 w-3 md:h-3.5 md:w-3.5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Copy details</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}
