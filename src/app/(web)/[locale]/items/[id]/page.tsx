import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Globe, MapPin, Users, Calendar } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { fetchTeamById } from '@/app/shared/api/teams.api';
import { Button } from '@/app/shared/ui/button';
import { Card, CardContent } from '@/app/shared/ui/card';

type Params = Promise<{ locale: string; id: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;
  const team = await fetchTeamById(id);

  if (!team) {
    return { title: 'Team not found' };
  }

  return {
    title: `${team.strTeam} | Details`,
    description: team.strDescriptionEN
      ? `${team.strDescriptionEN.slice(0, 150)}...`
      : `${team.strTeam} — English Premier League club.`,
  };
}

export default async function TeamPage({ params }: { params: Params }) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const [team, t, tTeams] = await Promise.all([
    fetchTeamById(id),
    getTranslations({ locale, namespace: 'teamDetail' }),
    getTranslations({ locale, namespace: 'teams' }),
  ]);

  if (!team) {
    notFound();
  }

  const websiteUrl = team.strWebsite
    ? team.strWebsite.startsWith('http')
      ? team.strWebsite
      : `https://${team.strWebsite}`
    : null;

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10 max-w-5xl">

        {/* Back button */}
        <Link href={`/${locale}`} className="inline-flex mb-8">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="size-4" />
            {tTeams('backToList')}
          </Button>
        </Link>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">

              {/* Left — badge + jersey */}
              <div className="flex flex-col items-center justify-center gap-6 bg-muted/40 p-10 md:w-72 shrink-0">
                {team.strBadge ? (
                  <Image
                    src={team.strBadge}
                    width={160}
                    height={160}
                    alt={team.strTeam}
                    className="object-contain drop-shadow-md"
                    priority
                  />
                ) : (
                  <div className="w-40 h-40 rounded-xl bg-muted flex items-center justify-center text-muted-foreground text-sm">
                    No badge
                  </div>
                )}

                {team.strTeamJersey && (
                  <Image
                    src={team.strTeamJersey}
                    width={80}
                    height={80}
                    alt={`${team.strTeam} jersey`}
                    className="object-contain opacity-80"
                  />
                )}
              </div>

              {/* Right — details */}
              <div className="flex flex-col gap-6 p-8 flex-1">

                <div>
                  <h1 className="text-3xl font-bold tracking-tight leading-tight mb-1">
                    {team.strTeam}
                  </h1>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-3">
                    {team.intFormedYear && (
                      <span className="flex items-center gap-1.5">
                        <Calendar className="size-4" />
                        {t('founded')}: <strong className="text-foreground">{team.intFormedYear}</strong>
                      </span>
                    )}
                    {team.strStadium && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="size-4" />
                        {t('stadium')}: <strong className="text-foreground">{team.strStadium}</strong>
                      </span>
                    )}
                    {team.intStadiumCapacity && (
                      <span className="flex items-center gap-1.5">
                        <Users className="size-4" />
                        {t('capacity')}: <strong className="text-foreground">{Number(team.intStadiumCapacity).toLocaleString()}</strong>
                      </span>
                    )}
                  </div>
                </div>

                <div className="border-t" />

                <div className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                  {team.strDescriptionEN ?? t('noDescription')}
                </div>

                {websiteUrl && (
                  <div className="mt-auto pt-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                        <Globe className="size-4" />
                        {t('website')}
                      </a>
                    </Button>
                  </div>
                )}
              </div>

            </div>
          </CardContent>
        </Card>

      </div>
    </main>
  );
}

