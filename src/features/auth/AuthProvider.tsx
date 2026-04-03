'use client';

import { useEffect, useMemo, useState } from 'react';
import { AuthContext } from './auth-context';
import { initialAuthState, type AuthState } from './auth-state';
import type { AuthUser } from './types';
import { restoreSession } from './session';

type AuthProviderProps = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);

  function setLoading() {
    setAuthState({
      user: null,
      status: 'loading',
    });
  }

  function setAuthenticated(user: AuthUser) {
    setAuthState({
      user,
      status: 'authenticated',
    });
  }

  function setUnauthenticated() {
    setAuthState({
      user: null,
      status: 'unauthenticated',
    });
  }

  useEffect(() => {
    let isMounted = true;

    async function initAuth() {
      try {
        const user = await restoreSession();

        if (isMounted) {
          setAuthenticated(user);
        }
      } catch {
        if (isMounted) {
          setUnauthenticated();
        }
      }
    }

    initAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      ...authState,
      setLoading,
      setAuthenticated,
      setUnauthenticated,
    }),
    [authState]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}