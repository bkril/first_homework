'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { z } from 'zod';

import { registerSchema } from '@/app/shared/utils/validations';
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

type RegisterFormValues = z.infer<typeof registerSchema>;

const inputCls =
  'h-10 bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400 ' +
  'hover:border-zinc-300 hover:bg-white ' +
  'focus-visible:bg-white focus-visible:border-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-900/10 ' +
  'transition-all duration-150 rounded-lg';

export function RegisterForm() {
  const t = useTranslations('auth');
  const router = useRouter();
  const registerAuth = useAuthStore((state) => state.register);
  const clearError = useAuthStore((state) => state.clearError);
  const isLoading = useAuthStore((state) => state.isLoading);
  const serverError = useAuthStore((state) => state.error);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    clearError();
    await registerAuth(values.email, values.password, values.name);
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
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" y1="8" x2="19" y2="14" />
            <line x1="22" y1="11" x2="16" y2="11" />
          </svg>
        </div>

        <CardTitle className="text-2xl text-center font-semibold tracking-tight text-zinc-900">
          {t('registerTitle')}
        </CardTitle>
        <CardDescription className="mt-1 text-center text-sm text-zinc-500">
          {t('registerDescription')}
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
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>{t('nameLabel')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t('namePlaceholder')}
                    className={inputCls}
                  />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />

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

          {/* Two-column row for passwords */}
          <div className="grid grid-cols-2 gap-3">
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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t('confirmPasswordLabel')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder={t('confirmPasswordPlaceholder')}
                      className={inputCls}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-1 h-10 w-full rounded-lg bg-zinc-900 font-medium text-white transition-colors duration-150 hover:bg-zinc-700 active:bg-zinc-950 disabled:opacity-50"
          >
            {isSubmitting ? t('loading') : t('registerSubmit')}
          </Button>
        </Form>

      </CardContent>
    </Card>
  );
}
