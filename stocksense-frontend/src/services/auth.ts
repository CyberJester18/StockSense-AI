import { supabase } from "./supabase";

export interface AuthUser {
  uid: string;
  email: string;
  displayName?: string;
  emailVerified: boolean;
  photoURL?: string;
}

function mapUser(user: any): AuthUser {
  return {
    uid: user.id,
    email: user.email ?? "",
    displayName:
      user.user_metadata?.full_name ||
      user.user_metadata?.display_name ||
      "",
    emailVerified: !!user.email_confirmed_at,
    photoURL: user.user_metadata?.avatar_url,
  };
}

export async function getSavedUser(): Promise<AuthUser | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? mapUser(user) : null;
}

export async function loginWithEmail(
  email: string,
  password: string
): Promise<AuthUser> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  if (!data.user.email_confirmed_at) {
    await supabase.auth.signOut();
    throw new Error(
      "Please verify your email before signing in."
    );
  }

  return mapUser(data.user);
}

export async function signUpWithEmail(
  email: string,
  password: string,
  displayName: string
): Promise<AuthUser> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: displayName,
      },
    },
  });

  if (error) throw error;

  if (!data.user) {
    throw new Error("Unable to create account.");
  }

  return mapUser(data.user);
}

export async function sendPasswordReset(
  email: string
): Promise<void> {
  const { error } = await supabase.auth.resetPasswordForEmail(
    email
  );

  if (error) throw error;
}

export async function verifyEmailCode() {
  return;
}

export async function logoutUser(): Promise<void> {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
}