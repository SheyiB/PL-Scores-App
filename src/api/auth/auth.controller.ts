import { AppError } from '@/common/utils/error';
import { UserRepo } from './auth.repository';
import { handleError } from '@/common/utils/error';
import { UserData, CreatedUser } from '@/common/model/user'
import { AuthService } from './auth.services'

import { Request, Response } from 'express'

export class AuthConroller {

    async signup(req: Request, res: Response) {
        try {

            const user = await AuthService.signup(req.body);

            res.status(201).send(user);
        } catch (error) {
            handleError(error, res);
        }
    }

    async login(req: Request, res: Response) {
        try {

            const { user, token } = await AuthService.login(req.body)

            res.status(200).json({ user, token });
        } catch (error) {
            handleError(error, res);
        }
    }
}

export const AuthController = new AuthConroller();
