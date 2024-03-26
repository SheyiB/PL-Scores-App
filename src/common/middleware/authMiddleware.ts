import jwt from 'jsonwebtoken';
import { User, CreatedUser } from '@/common/model/user';
import { Request, Response, NextFunction } from "express";
import { env } from '@/common/config/env'

interface AuthenticatedRequest extends Request {
    user?: CreatedUser
}

export const isSignedIn = async (req: Request, res: Response, next: NextFunction) => {

    let token = req.header('Authorization');

    if (!token) return next(res.status(401).json({ message: 'UNAUTHORIZED!' }))


    try {
        if (token.startsWith('Bearer')) {
            token = token.split(' ')[1]
        }

        const decoded = jwt.verify(token, env.JWT_SECRET!);

        const { id } = (decoded as any)
        const currentUser = await User.findById(id);

        if (!currentUser) return next(res.status(404).json({ message: 'USER NOT FOUND!' }));

        currentUser.password = '';

        // req.session.user = currentUser;
        (req as AuthenticatedRequest).user = currentUser;


    } catch (e: any) {

        if (e.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'TOKEN EXPIRED! LOGIN!' });
        }

        else {
            console.log(e)
            return res.status(406).json({ message: 'INVALID TOKEN! ' })
        }
    }

    return next()

}


export const isAdmin = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (userRole !== 'admin') {
        return res.status(401).json({ message: 'UNAUTHORIZED TO ACCESS THIS ROUTE' })
    }

    next()


}
