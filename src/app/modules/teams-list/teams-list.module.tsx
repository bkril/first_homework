'use server';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getQueryClient } from '@/app/shared/ui/query-provider';
import { fetchTeams } from '@/app/entities/api';
import { TeamList } from '@/app/features/teams';

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
