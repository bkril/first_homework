import { useTranslations } from 'next-intl'

import { Link } from '@/config/i18n/navigation'

export default function NotFoundPage() {
  const t = useTranslations('notFound')

  return (
    <div className='flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 text-center'>
      <p className='text-8xl font-bold tracking-tighter text-zinc-200'>{t('code')}</p>

      <h1 className='mt-4 text-2xl font-semibold text-zinc-900'>{t('title')}</h1>
      <p className='mt-2 max-w-sm text-sm text-zinc-500'>{t('description')}</p>

      <Link
        href='/'
        className='mt-8 inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700'
      >
        {t('backHome')}
      </Link>
    </div>
  )
}
