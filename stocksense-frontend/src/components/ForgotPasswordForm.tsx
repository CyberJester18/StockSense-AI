import React, { useState } from 'react';
import { Mail, Loader2, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { sendPasswordReset } from '../services/auth';

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

export function ForgotPasswordForm({ onBackToLogin }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      await sendPasswordReset(email);
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'We could not process this password recovery request.');
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
      {!isSubmitted ? (
        <>
          <div className="space-y-2 text-center sm:text-left">
            <h2 className="font-sans text-2xl font-bold tracking-tight text-text-primary">
              Reset password
            </h2>
            <p className="font-sans text-sm text-text-secondary">
              Enter your email address and we'll send a premium recovery token
            </p>
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3.5 text-xs text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
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

            {/* Submit Recovery */}
            <button
              type="submit"
              disabled={isLoading || !email.trim()}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-precision-blue py-3 font-sans text-sm font-semibold text-white transition-all hover:bg-precision-blue-hover focus:outline-none focus:ring-2 focus:ring-precision-blue/50 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Send Recovery Email</span>
                  <Send className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>
        </>
      ) : (
        /* Recovery email sent screen state */
        <div className="text-center py-4 space-y-5">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success-green/10 text-success-green border border-success-green/20">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div className="space-y-2">
            <h2 className="font-sans text-xl font-bold tracking-tight text-text-primary">
              Recovery Dispatch Sent
            </h2>
            <p className="font-sans text-xs text-text-secondary leading-relaxed max-w-sm mx-auto">
              We have dispatched password recovery guidelines to <strong className="text-text-primary">{email}</strong>. Please check your spam folder if it doesn't arrive within 2 minutes.
            </p>
          </div>
        </div>
      )}

      {/* Back button */}
      <div className="text-center pt-2 border-t border-border-card/40">
        <button
          onClick={onBackToLogin}
          className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Sign In</span>
        </button>
      </div>
    </motion.div>
  );
}
