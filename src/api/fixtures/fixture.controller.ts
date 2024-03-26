import { Request, Response } from 'express';

import { FixtureService } from './fixture.services';

import { handleError } from '@/common/utils/error'

export class FixtureController {

    async createFixture(req: Request, res: Response) {
        try {
            const fixture = await FixtureService.createFixture(req.body);

            res.status(201).json(fixture);
        } catch (error) {
            handleError(error, res)
        }
    }

    async getFixture(req: Request, res: Response) {
        try {
            const fixture = await FixtureService.getFixture(req.params.id);

            res.status(200).json(fixture);
        } catch (error) {
            handleError(error, res)
        }
    }

    async getFixtures(req: Request, res: Response) {
        try {
            const fixtures = await FixtureService.getFixtures()

            res.status(200).json(fixtures)
        } catch (error) {
            handleError(error, res)
        }
    }

    async updateFixture(req: Request, res: Response) {
        try {
            const updatedFixture = await FixtureService.updateFixture(req.params.id, req.body);

            res.status(200).json(updatedFixture);
        } catch (error) {
            handleError(error, res)
        }
    }

    async deleteFixture(req: Request, res: Response) {
        try {
            const deletedFixture = await FixtureService.deleteFixture(req.params.id);

            res.status(200).json(deletedFixture);
        } catch (error) {
            handleError(error, res)
        }
    }

    async generateMatcLink(req: Request, res: Response) {
        try {
            const matchLink = await FixtureService.generateFixtureLink(req.params.id);

            res.status(200).json({ matchLink });
        } catch (error) {
            handleError(error, res)
        }
    }


    async getFixturesByStatus(req: Request, res: Response) {
        try {
            const fixtures = await FixtureService.getFixturesByStatus(req.params.status as any)

            res.status(200).json(fixtures)
        } catch (error) {
            handleError(error, res)
        }
    }

}

export const Fixture = new FixtureController();