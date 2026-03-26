import { setRequestLocale } from 'next-intl/server';

import { LoginForm } from '@/app/features/auth';
import { RegisterForm } from '@/app/features/auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/shared/ui/tabs';

export default async function AuthPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-50 p-4">
      {/* Subtle dot grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, #d4d4d8 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Radial fade overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,transparent,#f4f4f5_70%)]" />

      <div className="relative w-full max-w-[460px]">
        <Tabs defaultValue="login" className="w-full gap-0">
          <TabsList className="grid w-full grid-cols-2 mb-0 rounded-b-none rounded-t-2xl border border-b-0 border-zinc-200/80 bg-zinc-100 shadow-xl shadow-zinc-200/50 h-11 p-1">
            <TabsTrigger
              value="login"
              className="rounded-xl text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow-sm text-zinc-500"
            >
              Sign in
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="rounded-xl text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow-sm text-zinc-500"
            >
              Sign up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-0">
            <LoginForm />
          </TabsContent>

          <TabsContent value="register" className="mt-0">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

