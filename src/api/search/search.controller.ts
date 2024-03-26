import { Request, Response } from 'express';
import { SearchService } from './search.services'
import { handleError } from '@/common/utils/error';

export class SearchController {
    async searchTeam(req: Request, res: Response) {
        try {
            const team = await SearchService.teamSearch(req.params.team);

            res.status(200).json(team);
        } catch (error) {
            handleError(error, res)
        }

    }

    async searchTeams(req: Request, res: Response) {
        try {
            const teams = await SearchService.teamsSearch(req.query as any);

            res.status(200).json(teams);
        } catch (error) {
            handleError(error, res)
        }

    }

}

export const Search = new SearchController();