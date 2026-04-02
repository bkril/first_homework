'use client'

import type { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { registerSchema } from '@/app/entities/models'
import { useAuthStore } from '@/app/shared/store'
import { Button } from '@/app/shared/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/shared/ui/form'
import { Input } from '@/app/shared/ui/input'
import { cn } from '@/app/shared/utils/cn.service'

type IRegisterFormValues = z.infer<typeof registerSchema>

interface IRegisterFormProps {
  className?: string
}

function RegisterFormComponent({ className }: IRegisterFormProps) {
  const t = useTranslations('auth')
  const register = useAuthStore((state) => state.register)
  const isLoading = useAuthStore((state) => state.isLoading)
  const error = useAuthStore((state) => state.error)
  const clearError = useAuthStore((state) => state.clearError)

  const form = useForm<IRegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  })

  async function onSubmit(values: IRegisterFormValues) {
    clearError()
    await register(values.email, values.password, values.name)
  }

  return (
    <div className={cn('rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xl shadow-zinc-200/50', className)}>
      <div className='mb-5'>
        <h2 className='text-lg font-semibold text-zinc-900'>{t('registerTitle')}</h2>
        <p className='mt-1 text-sm text-zinc-500'>{t('registerDescription')}</p>
      </div>

      <Form form={form} onSubmit={onSubmit} className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>{t('nameLabel')}</FormLabel>
              <FormControl>
                <Input type='text' placeholder={t('namePlaceholder')} aria-invalid={!!fieldState.error} {...field} />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>{t('emailLabel')}</FormLabel>
              <FormControl>
                <Input type='email' placeholder={t('emailPlaceholder')} aria-invalid={!!fieldState.error} {...field} />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>{t('passwordLabel')}</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder={t('passwordPlaceholder')}
                  aria-invalid={!!fieldState.error}
                  {...field}
                />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>{t('confirmPasswordLabel')}</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder={t('confirmPasswordPlaceholder')}
                  aria-invalid={!!fieldState.error}
                  {...field}
                />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />

        {error && <p className='text-xs font-medium text-red-500'>{error}</p>}

        <Button type='submit' className='w-full' disabled={isLoading}>
          {isLoading ? t('loading') : t('registerSubmit')}
        </Button>
      </Form>
    </div>
  )
}

export { RegisterFormComponent }
