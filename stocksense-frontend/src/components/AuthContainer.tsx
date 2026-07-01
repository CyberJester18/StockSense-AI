import React, { useState } from 'react';
import { X, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { EmailVerificationForm } from './EmailVerificationForm';
import { AuthUser } from '../services/auth';
import { supabase } from "../services/supabase";

export type AuthTab = 'login' | 'signup' | 'forgot' | 'verify';

interface AuthContainerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: AuthUser) => void;
  initialTab?: AuthTab;
}

export function AuthContainer({ isOpen, onClose, onSuccess, initialTab = 'login' }: AuthContainerProps) {
  const [activeTab, setActiveTab] = useState<AuthTab>(initialTab);
  const [pendingUser, setPendingUser] = useState<AuthUser | null>(null);

  if (!isOpen) return null;

  // Handles signup success to route to verification screen
  const handleSignupSuccess = (user: AuthUser) => {
    setPendingUser(user);
    setActiveTab('verify');
  };

 const handleVerificationSuccess = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  onSuccess({
    uid: user.id,
    email: user.email ?? "",
    displayName:
      user.user_metadata?.full_name ??
      "",
    emailVerified: !!user.email_confirmed_at,
    photoURL: user.user_metadata?.avatar_url,
  });
};

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop overlay blur effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#000000]/80 backdrop-blur-sm"
      />

      {/* Main Glassmorphic AI SaaS auth card box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border-card bg-surface-card/90 shadow-[0_0_50px_rgba(0,112,243,0.15)] backdrop-blur-md"
      >
        {/* Floating gradient orb in the upper corner */}
        <div className="absolute -right-16 -top-16 -z-10 h-36 w-36 rounded-full bg-precision-blue/25 blur-3xl" />
        <div className="absolute -left-16 -bottom-16 -z-10 h-36 w-36 rounded-full bg-success-green/10 blur-3xl" />

        {/* Header Branding section */}
        <div className="flex items-center justify-between border-b border-border-card/50 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-precision-blue text-white">
              <TrendingUp className="h-3 w-3" />
            </div>
            <span className="font-sans text-sm font-bold tracking-tight text-text-primary uppercase">
              StockSense-AI System
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-text-secondary hover:bg-zinc-800/80 hover:text-text-primary transition-colors"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Auth Forms switch wrapper */}
        <div className="p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'login' && (
              <LoginForm
                onSuccess={onSuccess}
                onSwitchToSignup={() => setActiveTab('signup')}
                onSwitchToForgot={() => setActiveTab('forgot')}
              />
            )}

            {activeTab === 'signup' && (
              <SignupForm
                onSuccess={handleSignupSuccess}
                onSwitchToLogin={() => setActiveTab('login')}
              />
            )}

            {activeTab === 'forgot' && (
              <ForgotPasswordForm
                onBackToLogin={() => setActiveTab('login')}
              />
            )}

            {activeTab === 'verify' && pendingUser && (
              <EmailVerificationForm
                pendingUser={pendingUser}
                onSuccess={() => handleVerificationSuccess()}
                onCancel={() => {
                  setPendingUser(null);
                  setActiveTab('login');
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Micro policy footer inside modal container */}
        <div className="bg-[#0e0e0e]/50 border-t border-border-card/40 px-6 py-3.5 text-center">
          <p className="font-sans text-[10px] text-text-secondary">
            Secured via SSL & enterprise-grade cryptography protocols.
          </p>
        </div>

      </motion.div>
    </div>
  );
}
