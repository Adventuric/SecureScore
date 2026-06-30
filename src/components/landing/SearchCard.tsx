'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, User, ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  username: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface SearchCardProps {
  onSearch: (email: string, username?: string) => void;
  isLoading: boolean;
}

export function SearchCard({ onSearch, isLoading }: SearchCardProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    onSearch(data.email, data.username || undefined);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-full max-w-lg space-y-3">
      <div className="relative">
        <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="email"
          placeholder="you@example.com"
          className="h-12 w-full border-white/10 bg-white/[0.03] pl-11 text-base backdrop-blur-xl placeholder:text-muted-foreground/50 focus:bg-white/[0.06] focus:border-brand-blue/40 transition-all duration-300"
          {...register('email')}
        />
      </div>
      {errors.email && (
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xs text-red-400"
        >
          {errors.email.message}
        </motion.p>
      )}

      <div className="relative">
        <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="username (optional)"
          className="h-12 w-full border-white/10 bg-white/[0.03] pl-11 text-base backdrop-blur-xl placeholder:text-muted-foreground/50 focus:bg-white/[0.06] focus:border-brand-blue/40 transition-all duration-300"
          {...register('username')}
        />
      </div>

      <Button
        type="submit"
        variant="gradient"
        size="lg"
        className="w-full h-12 text-base"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Search className="h-4 w-4" />
            </motion.span>
            Scanning...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Check My Security
            <ArrowRight className="h-4 w-4" />
          </span>
        )}
      </Button>
    </form>
  );
}
