import { getTranslations, setRequestLocale } from 'next-intl/server';

import { TeamsListModule } from '@/app/modules/teams';

export const revalidate = 3600;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'teams' });

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            {t('heading')}
          </h1>
          <p className="text-muted-foreground text-lg">{t('subheading')}</p>
        </div>

        <TeamsListModule foundedLabel={t('founded')} />
      </div>
    </main>
  );
}
