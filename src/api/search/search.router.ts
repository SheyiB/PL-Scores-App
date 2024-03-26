import { Router } from 'express';

import { Team } from '../teams/team.controller';
import { Fixture } from '../fixtures/fixture.controller';
import { Search } from './search.controller';

import { isSignedIn } from '@/common/middleware/authMiddleware';
export const router = Router();

router.get('/teams', isSignedIn, Team.getTeams);
router.get('/fixtures/:status', isSignedIn, Fixture.getFixturesByStatus)
router.get('/search/:team', Search.searchTeam);
router.get('/search', Search.searchTeams);

