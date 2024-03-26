import { Team, TeamData } from '@/common/model/team'
import { Fixture } from '@/common/model/fixture'
import { AppError } from '@/common/utils/error';


export class SearchRepository {
    async teamSearch(id: string) {
        try {
            this.validTeams([id]);
            const team = await Team.findOne({ $or: [{ teamName: id }, { teamCode: id }] });
            const teamFixtures = await Fixture.find({ $or: [{ homeTeam: team?.id }, { awayTeam: team?.id }] });
            return { team, teamFixtures };
        } catch (error) {
            throw error;
        }
    }

    async twoTeamSearch(team1: string, team2: string) {
        try {
            const teamOne = await Team.findOne({ $or: [{ teamName: team1 }, { teamCode: team1 }] });
            const teamTwo = await Team.findOne({ $or: [{ teamName: team2 }, { teamCode: team2 }] });
            const fixtures = await Fixture.find({
                $or: [
                    { homeTeam: teamOne?.id, awayTeam: teamTwo?.id },
                    { homeTeam: teamTwo?.id, awayTeam: teamOne?.id }
                ]
            }).populate('homeTeam awayTeam');
            const teamOneFixtures = await Fixture.find({ $or: [{ homeTeam: teamOne?.id }, { awayTeam: teamOne?.id }] }).populate('homeTeam awayTeam');
            const teamTwoFixtures = await Fixture.find({ $or: [{ homeTeam: teamTwo?.id }, { awayTeam: teamTwo?.id }] }).populate('homeTeam awayTeam');

            return { teamOne, team2, fixtures, teamOneFixtures, teamTwoFixtures };
        }
        catch (error) {

        }

    }

    async multipleTeamSearch(teams: string[]) {
        try {
            const validTeamsResult = await this.validTeams(teams);

            if (validTeamsResult.error) {
                throw validTeamsResult.error;
            }

            const teamsRegex = teams.map(team => new RegExp(`^${team}$`, 'i'));

            const teamsInfo = await Team.aggregate([
                {
                    $match: {
                        $or: [
                            { teamName: { $in: teamsRegex } },
                            { teamCode: { $in: teamsRegex } }
                        ]
                    }
                }
            ]);

            const fixturesH2H = await Fixture.find({ $and: [{ homeTeam: { $in: teamsInfo.map(team => team._id) } }, { awayTeam: { $in: teamsInfo.map(team => team._id) } }] }).populate('homeTeam awayTeam');

            const allTeamsFixtures = await Fixture.find({ $or: [{ homeTeam: { $in: teamsInfo.map(team => team._id) } }, { awayTeam: { $in: teamsInfo.map(team => team._id) } }] }).populate('homeTeam awayTeam');


            return { teamsInfo, fixturesH2H, allTeamsFixtures };

        }
        catch (error) {
            return error;
        }
    }

    async validTeams(teams: string[]) {

        try {
            const teamsRegex = teams.map(team => new RegExp(`^${team}$`, 'i'));

            const teamsInfo = await Team.aggregate([
                {
                    $match: {
                        $or: [
                            { teamName: { $in: teamsRegex } },
                            { teamCode: { $in: teamsRegex } }
                        ]
                    }
                }
            ]);

            if (teamsInfo.length !== teams.length) {
                const invalidTeams = teams.filter(team => !teamsInfo.some(teamInfo => teamInfo.teamName === team || teamInfo.teamCode === team));
                const error = new AppError(`The following teams do not exist: ${invalidTeams.join(', ')}`, 400);

                return { error };
            }

            return { valid: true };
        } catch (error) {
            return { error };
        }
    }
}

export const SearchRepo = new SearchRepository();