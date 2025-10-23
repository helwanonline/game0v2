import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { User, AuthChangeEvent, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string) => Promise<any>;
  signUp: (email: string) => Promise<any>;
  signOut: () => Promise<any>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInitialSession = async () => {
        if (!supabase) {
            setLoading(false);
            return;
        }
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        setLoading(false);

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event: AuthChangeEvent, session: Session | null) => {
                setUser(session?.user ?? null);
            }
        );

        return () => {
            subscription?.unsubscribe();
        };
    };

    getInitialSession();
  }, []);

  const signIn = useCallback(async (email: string) => {
    if (!supabase) throw new Error("Supabase client not initialized.");
    return await supabase.auth.signInWithOtp({ email });
  }, []);

  const signUp = useCallback(async (email: string) => {
    if (!supabase) throw new Error("Supabase client not initialized.");
    // Supabase handles new user creation with signInWithOtp
    return await supabase.auth.signInWithOtp({ email });
  }, []);

  const signOut = useCallback(async () => {
    if (!supabase) throw new Error("Supabase client not initialized.");
    await supabase.auth.signOut();
  }, []);
  

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
