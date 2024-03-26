import { Schema, model } from "mongoose";
import { userRoles } from '../constants'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { env } from '../../common/config/env'


export interface UserData {
    username: string;
    email: string;
    password: string;
    role: string;
    displayName: string;
}

export interface CreatedUser extends UserData {
    getSignedJwtToken: () => string;
    matchPassword: (password: string) => string;
}

const UserSchema = new Schema<CreatedUser>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: Object.values(userRoles)
    },
    displayName: {
        type: String,
        required: true
    }
})

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

});

UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, env.JWT_SECRET!, {
        expiresIn: env.JWT_EXPIRE
    })
}

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
}


export const User = model<CreatedUser>('User', UserSchema)




