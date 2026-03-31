import { setRequestLocale } from 'next-intl/server'

import { LoginForm } from '@/app/features/auth'

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className='relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-50 p-4'>
      <div
        className='pointer-events-none absolute inset-0 opacity-40'
        style={{
          backgroundImage: 'radial-gradient(circle, #d4d4d8 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,transparent,#f4f4f5_70%)]' />

      <div className='relative w-full max-w-[420px]'>
        <LoginForm />
      </div>
    </main>
  )
}
