import type { ITeam } from '../../models/team.model'

interface ITeamsApiResponse {
  teams: ITeam[] | null
}

export async function fetchTeams(): Promise<ITeam[]> {
  const res = await fetch(
    'https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=English%20Premier%20League',
    { next: { revalidate: 3600 } },
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch teams: ${res.status} ${res.statusText}`)
  }

  const data: ITeamsApiResponse = await res.json()

  return data.teams ?? []
}

export async function fetchTeamById(id: string): Promise<ITeam | null> {
  const teams = await fetchTeams()
  return teams.find((t) => String(t.idTeam) === String(id)) ?? null
}
