import { ArrowLeft, Calendar, Globe, MapPin, Users } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { fetchTeamById } from '@/app/entities/api'
import { Button } from '@/app/shared/ui/button'
import { Card, CardContent } from '@/app/shared/ui/card'
import { Link } from '@/config/i18n/navigation'

interface ITeamDetailModuleProps {
  id: string
  locale: string
}

async function TeamDetailModuleComponent({ id, locale }: ITeamDetailModuleProps) {
  const [team, t, tTeams] = await Promise.all([
    fetchTeamById(id),
    getTranslations({ locale, namespace: 'teamDetail' }),
    getTranslations({ locale, namespace: 'teams' }),
  ])

  if (!team) {
    notFound()
  }

  const websiteUrl = team.strWebsite
    ? team.strWebsite.startsWith('http')
      ? team.strWebsite
      : `https://${team.strWebsite}`
    : null

  return (
    <main className='bg-background min-h-screen'>
      <div className='container mx-auto max-w-5xl px-4 py-10'>
        <Link href='/' className='mb-8 inline-flex'>
          <Button variant='ghost' size='sm' className='gap-2'>
            <ArrowLeft className='size-4' />
            {tTeams('backToList')}
          </Button>
        </Link>

        <Card className='overflow-hidden'>
          <CardContent className='p-0'>
            <div className='flex flex-col md:flex-row'>
              <div className='bg-muted/40 flex shrink-0 flex-col items-center justify-center gap-6 p-10 md:w-72'>
                {team.strBadge ? (
                  <Image
                    src={team.strBadge}
                    width={160}
                    height={160}
                    alt={team.strTeam}
                    className='object-contain drop-shadow-md'
                    priority
                  />
                ) : (
                  <div className='bg-muted text-muted-foreground flex h-40 w-40 items-center justify-center rounded-xl text-sm'>
                    No badge
                  </div>
                )}

                {team.strTeamJersey && (
                  <Image
                    src={team.strTeamJersey}
                    width={80}
                    height={80}
                    alt={`${team.strTeam} jersey`}
                    className='object-contain opacity-80'
                  />
                )}
              </div>

              <div className='flex flex-1 flex-col gap-6 p-8'>
                <div>
                  <h1 className='mb-1 text-3xl leading-tight font-bold tracking-tight'>{team.strTeam}</h1>
                  <div className='text-muted-foreground mt-3 flex flex-wrap gap-4 text-sm'>
                    {team.intFormedYear && (
                      <span className='flex items-center gap-1.5'>
                        <Calendar className='size-4' />
                        {t('founded')}: <strong className='text-foreground'>{team.intFormedYear}</strong>
                      </span>
                    )}
                    {team.strStadium && (
                      <span className='flex items-center gap-1.5'>
                        <MapPin className='size-4' />
                        {t('stadium')}: <strong className='text-foreground'>{team.strStadium}</strong>
                      </span>
                    )}
                    {team.intStadiumCapacity && (
                      <span className='flex items-center gap-1.5'>
                        <Users className='size-4' />
                        {t('capacity')}:{' '}
                        <strong className='text-foreground'>{Number(team.intStadiumCapacity).toLocaleString()}</strong>
                      </span>
                    )}
                  </div>
                </div>

                <div className='border-t' />

                <div className='text-muted-foreground text-sm leading-relaxed whitespace-pre-line'>
                  {team.strDescriptionEN ?? t('noDescription')}
                </div>

                {websiteUrl && (
                  <div className='mt-auto pt-2'>
                    <Button variant='outline' size='sm' asChild>
                      <a href={websiteUrl} target='_blank' rel='noopener noreferrer' className='gap-2'>
                        <Globe className='size-4' />
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
  )
}

export { TeamDetailModuleComponent }
export default TeamDetailModuleComponent
