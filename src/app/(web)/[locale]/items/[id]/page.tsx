import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { fetchTeamById } from '@/app/entities/api'
import { TeamDetailModule } from '@/app/modules/team-detail'

type Params = Promise<{ locale: string; id: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params
  const team = await fetchTeamById(id)

  if (!team) {
    return { title: 'Team not found' }
  }

  return {
    title: `${team.strTeam} | Details`,
    description: team.strDescriptionEN
      ? `${team.strDescriptionEN.slice(0, 150)}...`
      : `${team.strTeam} — English Premier League club.`,
  }
}

export default async function TeamPage({ params }: { params: Params }) {
  const { locale, id } = await params
  setRequestLocale(locale)

  return <TeamDetailModule id={id} locale={locale} />
}
