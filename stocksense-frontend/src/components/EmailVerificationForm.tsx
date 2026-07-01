
import React, { useState, useEffect, useRef } from 'react';
import { Mail, Loader2, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { AuthUser } from "../services/auth";
import { supabase } from "../services/supabase";

interface EmailVerificationFormProps {
  pendingUser: AuthUser;
  onSuccess: (user: AuthUser) => void;
  onCancel: () => void;
}

export function EmailVerificationForm({ pendingUser, onSuccess, onCancel }: EmailVerificationFormProps) {
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

const handleCheckVerification = async () => {
  setIsLoading(true);
  setError(null);

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    setError(error.message);
    setIsLoading(false);
    return;
  }

  if (data.user?.email_confirmed_at) {
    onSuccess({
      uid: data.user.id,
      email: data.user.email ?? "",
      displayName: data.user.user_metadata?.full_name,
      emailVerified: true,
      photoURL: data.user.user_metadata?.avatar_url,
    });
  } else {
    setError("Your email is not verified yet. Please check your inbox.");
  }

  setIsLoading(false);
};

const handleResend = async () => {
  setError(null);

  await supabase.auth.resend({
    type: "signup",
    email: pendingUser.email,
  });

  alert("Verification email sent again.");
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="space-y-6"
    >
      
        <>
          <div className="space-y-2 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-precision-blue/10 text-precision-blue border border-precision-blue/20">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h2 className="font-sans text-2xl font-bold tracking-tight text-text-primary">
              Verify your email
            </h2>
            <p className="font-sans text-xs text-text-secondary leading-relaxed max-w-xs mx-auto">
                We've sent a verification email to
                <span className="text-text-primary font-medium">
                {pendingUser.email}
                </span>
                Please click the verification link in your inbox before continuing.
            </p>
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3.5 text-xs text-red-400 text-center">
              {error}
            </div>
          )}

            <form className="space-y-5">
    <button
        type="button"
        onClick={handleCheckVerification}
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-precision-blue py-3 font-sans text-sm font-semibold text-white transition-all hover:bg-precision-blue-hover disabled:opacity-50"
    >
        {isLoading ? (
        <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Checking...
        </>
        ) : (
        "I've Verified My Email"
        )}
    </button>

    <button
        type="button"
        onClick={handleResend}
        className="w-full rounded-lg border border-border-input py-3 text-sm text-text-primary hover:bg-white/5 transition"
    >
        Resend Verification Email
    </button>
    </form>
          
        </>
       (
        /* Code Verified and Authorized visual screen */
        <div className="text-center py-6 space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success-green/10 text-success-green border border-success-green/20">
            <CheckCircle2 className="h-7 w-7 animate-bounce" />
          </div>
          <div className="space-y-1.5">
            <h2 className="font-sans text-xl font-bold tracking-tight text-text-primary">
              Account Verified!
            </h2>
            <p className="font-sans text-xs text-text-secondary">
              Redirecting you to your intelligent workspace...
            </p>
          </div>
        </div>
      )

      {/* Back to sign in / cancel button */}
      <div className="text-center pt-2 border-t border-border-card/40">
        <button
          onClick={onCancel}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors disabled:opacity-50"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Sign In</span>
        </button>
      </div>
    </motion.div>
  );
}
