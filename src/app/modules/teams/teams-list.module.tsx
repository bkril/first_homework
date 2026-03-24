'use server';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getQueryClient } from '@/app/shared/providers';
import { fetchTeams } from '@/app/entities/teams';
import { TeamList } from '@/app/features/teams/ui';

interface TeamsListModuleProps {
  foundedLabel: string;
}

export async function TeamsListModule({ foundedLabel }: TeamsListModuleProps) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['teams'],
    queryFn: fetchTeams,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TeamList foundedLabel={foundedLabel} />
    </HydrationBoundary>
  );
}
