import { getTranslations, setRequestLocale } from 'next-intl/server'

import { TeamsListModuleComponent } from '@/app/modules/teams-list'
import { routing } from '@/config/i18n/routing'

export const revalidate = 3600

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'teams' })

  return (
    <main className='bg-background min-h-screen'>
      <div className='container mx-auto px-4 py-12'>
        <div className='mb-10 text-center'>
          <h1 className='mb-2 text-4xl font-bold tracking-tight'>{t('heading')}</h1>
          <p className='text-muted-foreground text-lg'>{t('subheading')}</p>
        </div>

        <TeamsListModuleComponent foundedLabel={t('founded')} />
      </div>
    </main>
  )
}
