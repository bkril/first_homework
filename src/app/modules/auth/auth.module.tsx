'use client'

import { useEffect, useState } from 'react'

import { useAuthStore } from '@/app/shared/store'
import { usePathname, useRouter } from '@/config/i18n/navigation'
import { supabase } from '@/pkg/supabase'

const AUTH_ROUTES = ['/auth', '/login', '/register']

function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some((route) => pathname.includes(route))
}

interface IAuthProviderProps {
  children: React.ReactNode
}

function AuthProviderComponent({ children }: IAuthProviderProps) {
  const router = useRouter()
  const pathname = usePathname()

  const setUser = useAuthStore((state) => state.setUser)
  const user = useAuthStore((state) => state.user)

  const [isAuthChecking, setIsAuthChecking] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setIsAuthChecking(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (isAuthChecking) return

    const onAuthPage = isAuthRoute(pathname)

    if (!user && !onAuthPage) {
      router.push('/auth')
      return
    }

    if (user && onAuthPage) {
      router.push('/')
    }
  }, [user, pathname, isAuthChecking, router])

  if (isAuthChecking) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-zinc-50'>
        <div className='flex flex-col items-center gap-3'>
          <div className='h-7 w-7 animate-spin rounded-full border-2 border-zinc-200 border-t-zinc-900' />
          <span className='text-xs text-zinc-400'>Loading...</span>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export { AuthProviderComponent }
export default AuthProviderComponent
