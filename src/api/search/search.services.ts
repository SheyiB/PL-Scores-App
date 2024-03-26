import { SearchRepo } from './search.repository'
import { AppError } from '@/common/utils/error';

export class SearchServices {
    async teamSearch(team: string) {
        try {
            const teamSearch = await SearchRepo.teamSearch(team);

            return teamSearch;
        } catch (error) {
            throw error;
        }

    }

    async teamsSearch(teams: []) {
        try {

            const teamNames = Object.values(teams);
            if (!teams || teamNames.length < 2) throw new AppError('Supply at least two teams to search', 400);

            const teamsSearch = await SearchRepo.multipleTeamSearch(teamNames);

            return teamsSearch;
        } catch (error) {
            throw error;
        }
    }
}


export const SearchService = new SearchServices();