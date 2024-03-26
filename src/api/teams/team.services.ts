import { TeamRepo } from './team.repository'
import { TeamData } from '@/common/model/team'

export class TeamServices {
    async createTeam(team: TeamData) {
        try {
            const newTeam = await TeamRepo.createTeam(team);

            return newTeam;
        } catch (error) {
            throw error;
        }
    }


    async getTeam(id: string) {
        try {
            const team = await TeamRepo.getTeam(id);

            return team;
        } catch (error) {
            throw error;
        }
    }

    async getTeams() {
        try {
            const teams = await TeamRepo.getTeams();

            return teams;
        } catch (error) {
            throw error;
        }
    }

    async updateTeam(id: string, team: TeamData) {
        try {
            const updatedTeam = await TeamRepo.updateTeam(id, team);

            return updatedTeam;
        } catch (error) {
            throw error;
        }
    }

    async deleteTeam(id: string) {
        try {
            const deletedTeam = await TeamRepo.deleteTeam(id);

            return deletedTeam;
        } catch (error) {
            throw error;
        }
    }
}

export const TeamService = new TeamServices();