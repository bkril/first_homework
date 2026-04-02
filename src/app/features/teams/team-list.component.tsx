'use client'

import Image from 'next/image'

import { useQuery } from '@tanstack/react-query'

import { fetchTeams } from '@/app/entities/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/shared/ui/card'
import { Link } from '@/config/i18n/navigation'

interface ITeamListProps {
  foundedLabel?: string
}

function TeamListComponent({ foundedLabel = 'Founded' }: ITeamListProps) {
  const {
    data: teams = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ['teams'],
    queryFn: fetchTeams,
  })
  if (isPending) {
    return (
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className='animate-pulse'>
            <CardHeader>
              <div className='bg-muted mx-auto h-[100px] w-[100px] rounded-lg' />
            </CardHeader>
            <CardContent>
              <div className='bg-muted mb-2 h-5 w-3/4 rounded' />
              <div className='bg-muted h-4 w-1/2 rounded' />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className='flex flex-col items-center justify-center gap-4 py-20'>
        <p className='text-destructive text-lg font-medium'>Failed to load teams. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {teams.map((team) => (
        <Link
          key={team.idTeam}
          href={'/items/' + team.idTeam}
          className='group focus-visible:ring-ring rounded-xl focus-visible:ring-2 focus-visible:outline-none'
        >
          <Card className='hover:ring-primary/40 group-focus-visible:ring-primary/40 h-full cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg'>
            <CardHeader className='items-center'>
              <div className='relative mx-auto flex h-[100px] w-[100px] items-center justify-center'>
                {team.strBadge ? (
                  <Image
                    src={team.strBadge}
                    width={100}
                    height={100}
                    alt={team.strTeam}
                    className='object-contain drop-shadow-sm transition-transform duration-200 group-hover:scale-110'
                  />
                ) : (
                  <div className='bg-muted text-muted-foreground flex h-[100px] w-[100px] items-center justify-center rounded-lg text-xs'>
                    No badge
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className='flex flex-col gap-1 text-center'>
              <CardTitle className='text-sm leading-tight font-semibold'>{team.strTeam}</CardTitle>
              {team.intFormedYear && (
                <p className='text-muted-foreground text-xs'>
                  {foundedLabel} {team.intFormedYear}
                </p>
              )}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

export { TeamListComponent }
export default TeamListComponent
