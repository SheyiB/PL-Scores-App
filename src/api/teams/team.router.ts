import express, { Router } from 'express';
import { isSignedIn, isAdmin } from '@/common/middleware/authMiddleware';
import { Team } from './team.controller';

export const router = Router();

const protectedRoutes = [isSignedIn, isAdmin];

router.get('/:id', protectedRoutes, Team.getTeam);
router.get('/', protectedRoutes, Team.getTeams);
router.put('/:id', protectedRoutes, Team.updateTeam);
router.delete('/:id', protectedRoutes, Team.deleteTeam);
router.post('/', protectedRoutes, Team.createTeam);


