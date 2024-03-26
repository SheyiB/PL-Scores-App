import { Schema, model } from 'mongoose'


export interface TeamData {
    teamName: string;
    teamCode: string;
}

const TeamSchema = new Schema<TeamData>({
    teamName: {
        type: String,
        required: true,
    },
    teamCode: {
        type: String,
        required: true,
        unique: true
    }

})

export const Team = model<TeamData>('Team', TeamSchema)