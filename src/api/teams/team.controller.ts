import { Request, Response } from 'express';

import { TeamService } from './team.services'

import { handleError } from '@/common/utils/error';

export class TeamController {
    async createTeam(req: Request, res: Response) {
        try {
            const team = await TeamService.createTeam(req.body);

            res.status(201).json(team);
        } catch (error) {
            handleError(error, res)
        }
    }

    async getTeam(req: Request, res: Response) {
        try {
            const team = await TeamService.getTeam(req.params.id);

            res.status(200).json(team);
        } catch (error) {
            handleError(error, res)
        }
    }

    async getTeams(req: Request, res: Response) {
        try {
            const teams = await TeamService.getTeams();

            res.status(200).json(teams);
        } catch (error) {
            handleError(error, res)
        }
    }

    async updateTeam(req: Request, res: Response) {
        try {
            const updatedTeam = await TeamService.updateTeam(req.params.id, req.body);

            res.status(200).json(updatedTeam);
        } catch (error) {
            handleError(error, res)
        }
    }

    async deleteTeam(req: Request, res: Response) {
        try {
            const deletedTeam = await TeamService.deleteTeam(req.params.id);

            res.status(200).json(deletedTeam);
        } catch (error) {
            handleError(error, res)
        }
    }
}

export const Team = new TeamController();