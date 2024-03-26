import { UserRepo } from './auth.repository'
import { UserData, CreatedUser } from '@/common/model/user'
import { AppError } from '@/common/utils/error'


export class AuthServices {
    async signup(user: UserData) {
        try {
            const newUser = await UserRepo.createUser(user);

            return newUser;
        } catch (error) {
            throw error;
        }
    }


    async login(userInfo: { email: string, password: string }) {
        try {
            const user = await UserRepo.getUser(userInfo.email);

            if (!user) throw new AppError('User not found', 404);

            const isMatch = await user.matchPassword(userInfo.password);

            if (!isMatch) throw new AppError('Invalid Credentials', 401);

            const token = await user.getSignedJwtToken();

            return { user, token };
        } catch (error) {
            throw error;
        }

    }
}

export const AuthService = new AuthServices();