import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { loginWithEmail, AuthUser } from '../services/auth';

interface LoginFormProps {
  onSuccess: (user: AuthUser) => void;
  onSwitchToSignup: () => void;
  onSwitchToForgot: () => void;
}

export function LoginForm({ onSuccess, onSwitchToSignup, onSwitchToForgot }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const user = await loginWithEmail(email, password);
      onSuccess(user);
    } catch (err: unknown) {
    if (err instanceof Error) {
        setError(err.message);
    } else {
        setError("Authentication failed. Please try again.");
    }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="space-y-6"
    >
      <div className="space-y-2 text-center sm:text-left">
        <h2 className="font-sans text-2xl font-bold tracking-tight text-text-primary">
          Welcome back
        </h2>
        <p className="font-sans text-sm text-text-secondary">
          Enter your credentials to access your financial insights
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3.5 text-xs text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="font-mono text-[10px] font-semibold tracking-wider text-text-secondary uppercase">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-500">
              <Mail className="h-4 w-4" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full rounded-lg border border-border-input bg-bg-base/70 pl-10 pr-4 py-3 font-sans text-sm font-medium text-text-primary placeholder-zinc-600 outline-none transition-all focus:border-precision-blue focus:ring-1 focus:ring-precision-blue/40"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="font-mono text-[10px] font-semibold tracking-wider text-text-secondary uppercase">
              Password
            </label>
            <button
              type="button"
              onClick={onSwitchToForgot}
              className="font-sans text-xs text-precision-blue hover:text-precision-blue-hover transition-colors"
              tabIndex={-1}
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-500">
              <Lock className="h-4 w-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-border-input bg-bg-base/70 pl-10 pr-10 py-3 font-sans text-sm font-medium text-text-primary placeholder-zinc-600 outline-none transition-all focus:border-precision-blue focus:ring-1 focus:ring-precision-blue/40"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="relative flex w-full items-center justify-center gap-2 rounded-lg bg-precision-blue py-3 font-sans text-sm font-semibold text-white transition-all hover:bg-precision-blue-hover focus:outline-none focus:ring-2 focus:ring-precision-blue/50 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>
      </form>

      <div className="text-center pt-2">
        <p className="font-sans text-xs text-text-secondary">
          Don't have an account?{' '}
          <button
            onClick={onSwitchToSignup}
            className="font-semibold text-precision-blue hover:text-precision-blue-hover transition-colors"
          >
            Create an account
          </button>
        </p>
      </div>
    </motion.div>
  );
}
