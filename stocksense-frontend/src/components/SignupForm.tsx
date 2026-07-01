import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { signUpWithEmail, AuthUser } from '../services/auth';

interface SignupFormProps {
  onSuccess: (user: AuthUser) => void;
  onSwitchToLogin: () => void;
}

export function SignupForm({ onSuccess, onSwitchToLogin }: SignupFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simple reactive password strength checker
  const getPasswordStrength = () => {
    if (!password) return { label: 'Empty', score: 0, color: 'bg-zinc-800' };
    let score = 0;
    if (password.length >= 6) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 1) return { label: 'Weak', score: 25, color: 'bg-red-500' };
    if (score === 2) return { label: 'Medium', score: 50, color: 'bg-amber-500' };
    if (score === 3) return { label: 'Strong', score: 75, color: 'bg-blue-500' };
    return { label: 'Excellent', score: 100, color: 'bg-success-green' };
  };

  const strength = getPasswordStrength();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) return;

    if (!agreeTerms) {
      setError('You must agree to the Terms of Service & Privacy Policy.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const user = await signUpWithEmail(email, password, name);
      onSuccess(user);
    } catch (err: unknown) {
    if (err instanceof Error) {
        setError(err.message);
    } else {
        setError("Registration failed. Please try again.");
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
          Create an account
        </h2>
        <p className="font-sans text-sm text-text-secondary">
          Join StockSense-AI to begin forecasting real stock trends
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3.5 text-xs text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name Field */}
        <div className="space-y-1.5">
          <label className="font-mono text-[10px] font-semibold tracking-wider text-text-secondary uppercase">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-500">
              <User className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Carter"
              className="w-full rounded-lg border border-border-input bg-bg-base/70 pl-10 pr-4 py-3 font-sans text-sm font-medium text-text-primary placeholder-zinc-600 outline-none transition-all focus:border-precision-blue focus:ring-1 focus:ring-precision-blue/40"
              required
              disabled={isLoading}
            />
          </div>
        </div>

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
          <label className="font-mono text-[10px] font-semibold tracking-wider text-text-secondary uppercase">
            Choose Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-500">
              <Lock className="h-4 w-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
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

          {/* Password Strength Indicator */}
          {password && (
            <div className="pt-2 space-y-1">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-text-secondary uppercase">Password Strength:</span>
                <span className={`font-semibold uppercase ${
                  strength.label === 'Weak' ? 'text-red-400' :
                  strength.label === 'Medium' ? 'text-amber-400' :
                  strength.label === 'Strong' ? 'text-blue-400' : 'text-success-green'
                }`}>{strength.label}</span>
              </div>
              <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                  style={{ width: `${strength.score}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Terms and Conditions checkbox */}
        <label className="flex items-start gap-2.5 pt-1 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="mt-0.5 rounded bg-bg-base border-border-input text-precision-blue focus:ring-0 focus:ring-offset-0 shrink-0"
            disabled={isLoading}
          />
          <span className="font-sans text-xs text-text-secondary leading-normal">
            I agree to the{' '}
            <a href="#terms" onClick={(e) => e.preventDefault()} className="text-precision-blue hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="text-precision-blue hover:underline">Privacy Policy</a>.
          </span>
        </label>

        {/* Action Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="relative flex w-full items-center justify-center gap-2 rounded-lg bg-precision-blue py-3 font-sans text-sm font-semibold text-white transition-all hover:bg-precision-blue-hover focus:outline-none focus:ring-2 focus:ring-precision-blue/50 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Registering account...</span>
            </>
          ) : (
            <>
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>
      </form>

      <div className="text-center pt-2">
        <p className="font-sans text-xs text-text-secondary">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="font-semibold text-precision-blue hover:text-precision-blue-hover transition-colors"
          >
            Sign In
          </button>
        </p>
      </div>
    </motion.div>
  );
}
