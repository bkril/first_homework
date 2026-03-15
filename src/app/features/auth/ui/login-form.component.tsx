'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { z } from 'zod';

import { loginSchema } from '@/app/shared/utils/validations';
import { useAuthStore } from '@/app/shared/store/auth.store';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/shared/ui/form';
import { Input } from '@/app/shared/ui/input';
import { Button } from '@/app/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/shared/ui/card';

type LoginFormValues = z.infer<typeof loginSchema>;

const inputCls =
  'h-10 bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400 ' +
  'hover:border-zinc-300 hover:bg-white ' +
  'focus-visible:bg-white focus-visible:border-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-900/10 ' +
  'transition-all duration-150 rounded-lg';

export function LoginForm() {
  const t = useTranslations('auth');
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const clearError = useAuthStore((state) => state.clearError);
  const isLoading = useAuthStore((state) => state.isLoading);
  const serverError = useAuthStore((state) => state.error);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: LoginFormValues) => {
    clearError();
    await login(values.email, values.password);
    if (!useAuthStore.getState().error) {
      router.push('/');
    }
  };

  const isSubmitting = form.formState.isSubmitting || isLoading;

  return (
    <Card className="w-full rounded-2xl border border-zinc-200/80 bg-white shadow-xl shadow-zinc-200/50">
      <CardHeader className="px-8 pb-2 pt-8">
        {/* Brand mark */}
        <div className="mb-4 flex h-9 w-9 items-center mx-auto justify-center rounded-xl bg-zinc-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-white"
          >
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <polyline points="10 17 15 12 10 7" />
            <line x1="15" y1="12" x2="3" y2="12" />
          </svg>
        </div>

        <CardTitle className="text-2xl text-center font-semibold tracking-tight text-zinc-900">
          {t('loginTitle')}
        </CardTitle>
        <CardDescription className="mt-1 text-center text-sm text-zinc-500">
          {t('loginDescription')}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-8 pb-8 pt-6">
        <Form form={form} onSubmit={onSubmit} className="space-y-5">
          {serverError && (
            <div className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-px h-4 w-4 shrink-0"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{serverError}</span>
            </div>
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>{t('emailLabel')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    className={inputCls}
                  />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>{t('passwordLabel')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder={t('passwordPlaceholder')}
                    className={inputCls}
                  />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-1 h-10 w-full rounded-lg bg-zinc-900 font-medium text-white transition-colors duration-150 hover:bg-zinc-700 active:bg-zinc-950 disabled:opacity-50"
          >
            {isSubmitting ? t('loading') : t('loginSubmit')}
          </Button>
        </Form>

        <div className="mt-6 text-center text-sm text-zinc-500">
          {t('noAccountYet')}{' '}
          <Link
            href="/register"
            className="font-medium text-zinc-900 underline-offset-4 transition-colors duration-150 hover:text-zinc-600 hover:underline"
          >
            {t('toRegister')}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
