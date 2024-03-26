import express, { Router } from 'express';

import { Fixture } from './fixture.controller';
import { isSignedIn, isAdmin } from '@/common/middleware/authMiddleware';

export const router = Router();

const protectedRoutes = [isSignedIn, isAdmin];

router.get('/:id', protectedRoutes, Fixture.getFixture);
router.get('/', protectedRoutes, Fixture.getFixtures);
router.put('/:id', protectedRoutes, Fixture.updateFixture);
router.delete('/:id', protectedRoutes, Fixture.deleteFixture);
router.post('/', protectedRoutes, Fixture.createFixture);
router.get('/link/:id', protectedRoutes, Fixture.generateMatcLink);
