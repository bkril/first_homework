'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import { supabase } from '@/pkg/supabase';
import { useAuthStore } from '@/app/shared/store/auth.store';
import { routing } from '@/i18n/routing';


function getLocaleFromPathname(pathname: string): string {
  const segment = pathname.split('/')[1];
  return (routing.locales as readonly string[]).includes(segment)
    ? segment
    : routing.defaultLocale;
}

const AUTH_ROUTES = ['/auth', '/login', '/register'];

function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some((route) => pathname.includes(route));
}


interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);

  const [isAuthChecking, setIsAuthChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsAuthChecking(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAuthChecking) return;

    const locale = getLocaleFromPathname(pathname);
    const onAuthPage = isAuthRoute(pathname);

    if (!user && !onAuthPage) {
      router.push(`/${locale}/auth`);
      return;
    }

    if (user && onAuthPage) {
      router.push(`/${locale}`);
    }
  }, [user, pathname, isAuthChecking, router]);

  if (isAuthChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-zinc-200 border-t-zinc-900" />
          <span className="text-xs text-zinc-400">Loading...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

