import { Team, TeamData } from '@/common/model/team'
import { Model } from 'mongoose'
import { logger } from '@/server'
import { AppError } from '@/common/utils/error'


export class TeamRepository {
    private model: Model<TeamData>;

    constructor() {
        this.model = Team;
    }

    async createTeam(team: TeamData) {
        try {
            let newTeam = await this.model.findOne({ teamCode: team.teamCode });

            if (newTeam) throw new AppError('Team already exists', 400);

            newTeam = await this.model.create(team);

            return newTeam;
        } catch (error) {
            throw error;
        }
    }

    async getTeam(id: string) {
        try {
            const team = await this.model.findOne({ $or: [{ teamName: id }, { teamCode: id }] });

            if (!team) throw new AppError('Team not found', 404);

            return team;
        } catch (error) {
            throw error;
        }
    }

    async getTeams() {
        try {
            const teams = await this.model.find();

            if (!teams) throw new AppError('No team found', 404);

            return teams;
        } catch (error) {
            throw error;
        }
    }

    async updateTeam(id: string, teamInfo: TeamData) {
        try {

            let team = await this.model.findOne({ $or: [{ teamName: id }, { teamCode: id }] });

            if (!team) throw new AppError('Team not found', 404);

            team = await this.model.findOneAndUpdate({ $or: [{ teamName: id }, { teamCode: id }] }, teamInfo, { new: true, runValidators: true });

            return team;
        } catch (error) {
            throw error;
        }
    }

    async deleteTeam(id: string) {
        try {
            let team = await this.model.findOne({ $or: [{ teamName: id }, { teamCode: id }] });

            if (!team) throw new AppError('Team not found', 404);

            team = await this.model.findOneAndDelete({ $or: [{ name: id }, { teamCode: id }] });

            return team;
        } catch (error) {
            throw error;
        }
    }


}


export const TeamRepo = new TeamRepository();