import mongoose, { Schema, model, Types } from 'mongoose'
import { fixtureStatus } from '@/common/constants'
import { env } from '@/common/config/env'



export interface FixtureInterface {
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    matchStatus: string;
    matchLink: string;
    matchCode: string;
}
export interface FixtureData {
    homeTeam: Types.ObjectId;
    awayTeam: Types.ObjectId;
    homeScore: number;
    awayScore: number;
    matchStatus: string;
    matchLink: string;
    matchCode: string;
    generateFixtureLink: () => Promise<string>;
}

const FixtureSchema = new Schema<FixtureData>({
    homeTeam: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Team'
    },
    awayTeam: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Team'

    },
    homeScore: {
        type: Number,
        required: true,
        default: 0
    },
    awayScore: {
        type: Number,
        required: true,
        default: 0
    },
    matchCode: {
        type: String,
        required: true,
        unique: true
    },

    matchStatus: {
        type: String,
        required: true,
        enum: Object.values(fixtureStatus),
        default: fixtureStatus.PENDING
    },
    matchLink: {
        type: String
    }
})

FixtureSchema.methods.generateFixtureLink = async function () {
    const link = `${env.API_URL}/fixtures/${this.matchCode}`;
    this.matchLink = link
    return link;
};

export const Fixture = model<FixtureData>('Fixture', FixtureSchema)