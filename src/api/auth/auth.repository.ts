import { User, UserData, CreatedUser } from '../../common/model/user'
import { Model } from 'mongoose'
import { AppError } from '@/common/utils/error'

export class UserRepository {
    private model: Model<CreatedUser>;

    constructor() {
        this.model = User;
    }

    async createUser(user: UserData) {
        try {
            let newUser = await this.model.findOne({ email: user.email });

            if (newUser) throw new AppError('User already exists', 400);

            newUser = await this.model.create(user);

            return newUser;
        } catch (error: any) {

            throw error;
        }
    }

    async getUser(id: string) {
        try {
            const user = await this.model.findOne({ $or: [{ email: id }, { username: id }] });

            if (!user) throw new AppError('User not found', 404);

            return user;
        } catch (error: any) {
            throw error;
        }
    }
}

export const UserRepo = new UserRepository();