'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

import { fetchTeams } from '@/app/shared/api/teams.api';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/shared/ui/card';

interface TeamListProps {
  foundedLabel?: string;
}

export function TeamList({ foundedLabel = 'Founded' }: TeamListProps) {
  const { data: teams = [], isPending, isError } = useQuery({
    queryKey: ['teams'],
    queryFn: fetchTeams,
  });
  if (isPending) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="mx-auto h-[100px] w-[100px] rounded-lg bg-muted" />
            </CardHeader>
            <CardContent>
              <div className="h-5 w-3/4 rounded bg-muted mb-2" />
              <div className="h-4 w-1/2 rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-destructive text-lg font-medium">
          Failed to load teams. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {teams.map((team) => (
        <Link
          key={team.idTeam}
          href={'/items/' + team.idTeam}
          className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
        >
          <Card className="h-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:ring-primary/40 group-focus-visible:ring-primary/40 cursor-pointer">
            <CardHeader className="items-center">
              <div className="relative flex items-center justify-center w-[100px] h-[100px] mx-auto">
                {team.strBadge ? (
                  <Image
                    src={team.strBadge}
                    width={100}
                    height={100}
                    alt={team.strTeam}
                    className="object-contain drop-shadow-sm transition-transform duration-200 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-[100px] h-[100px] rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-xs">
                    No badge
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-1 text-center">
              <CardTitle className="text-sm font-semibold leading-tight">
                {team.strTeam}
              </CardTitle>
              {team.intFormedYear && (
                <p className="text-xs text-muted-foreground">
                  {foundedLabel} {team.intFormedYear}
                </p>
              )}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

