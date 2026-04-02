'use server'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { fetchTeams } from '@/app/entities/api'
import { TeamListComponent } from '@/app/features/teams'
import { getQueryClient } from '@/app/shared/ui/query-provider'

interface ITeamsListModuleProps {
  foundedLabel: string
}

async function TeamsListModuleComponent({ foundedLabel }: ITeamsListModuleProps) {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['teams'],
    queryFn: fetchTeams,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TeamListComponent foundedLabel={foundedLabel} />
    </HydrationBoundary>
  )
}

export { TeamsListModuleComponent }
export default TeamsListModuleComponent
