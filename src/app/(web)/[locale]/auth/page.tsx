import { setRequestLocale } from 'next-intl/server'

import { LoginFormComponent } from '@/app/features/auth'
import { RegisterFormComponent } from '@/app/features/auth'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/shared/ui/tabs'
import { routing } from '@/config/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function AuthPage({ params }: { params: Promise<{ locale: string }> }) {
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

      <div className='relative w-full max-w-[460px]'>
        <Tabs defaultValue='login' className='w-full gap-0'>
          <TabsList className='mb-0 grid h-11 w-full grid-cols-2 rounded-t-2xl rounded-b-none border border-b-0 border-zinc-200/80 bg-zinc-100 p-1 shadow-xl shadow-zinc-200/50'>
            <TabsTrigger
              value='login'
              className='rounded-xl text-sm font-medium text-zinc-500 data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow-sm'
            >
              Sign in
            </TabsTrigger>
            <TabsTrigger
              value='register'
              className='rounded-xl text-sm font-medium text-zinc-500 data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow-sm'
            >
              Sign up
            </TabsTrigger>
          </TabsList>

          <TabsContent value='login' className='mt-0'>
            <LoginFormComponent />
          </TabsContent>

          <TabsContent value='register' className='mt-0'>
            <RegisterFormComponent />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
