import { Fixture, FixtureData, FixtureInterface } from '@/common/model/fixture'
import { Team, TeamData } from '@/common/model/team'
import { Model } from 'mongoose'
import { AppError } from '@/common/utils/error'

export class FixtureRepository {
    private model: Model<FixtureData>

    constructor() {
        this.model = Fixture
    }

    async createFixture(fixture: FixtureInterface) {
        try {
            const { homeTeam, awayTeam } = fixture
            const team1: any = await Team.findOne({ $or: [{ teamCode: homeTeam }, { teamName: homeTeam }] })
            if (!team1) throw new AppError(`${team1} does not exist`, 404)
            const team2: any = await Team.findOne({ $or: [{ teamCode: awayTeam }, { teamName: awayTeam }] })
            if (!team2) throw new AppError(`${team2} does not exist`, 404)
            fixture.homeTeam = team1.id
            fixture.awayTeam = team2.id
            fixture.matchCode = team1.teamCode + team2.teamCode

            let newFixture = (await this.model.create(fixture)).populate('homeTeam awayTeam')

            return newFixture;

        } catch (error) {
            throw error;
        }
    }

    async getFixture(id: string) {
        try {

            const fixture = await this.model.aggregate([
                {
                    $match: {
                        matchCode: id
                    }
                },
                {
                    $lookup: {
                        from: "teams",
                        localField: "homeTeam",
                        foreignField: "_id",
                        as: "homeTeam"
                    }
                },
                {
                    $lookup: {
                        from: "teams",
                        localField: "awayTeam",
                        foreignField: "_id",
                        as: "awayTeam"
                    }
                },
                {
                    $addFields: {
                        homeTeam: { $ifNull: [{ $arrayElemAt: ["$homeTeam.teamName", 0] }, null] },
                        awayTeam: { $ifNull: [{ $arrayElemAt: ["$awayTeam.teamName", 0] }, null] }
                    }
                },
                {
                    $limit: 1
                }
            ])
            if (!fixture) throw new AppError('Fixture not found', 404)

            return fixture;
        } catch (error) {
            throw error;
        }

    }

    async getFixtures(query?: any) {
        try {
            if (query) {
                const fixtures = await this.model.find(query);

                return fixtures;
            }
            const fixtures = await this.model.find();

            return fixtures;
        } catch (error) {
            throw error;
        }

    }

    async updateFixture(id: string, fixtureInfo: FixtureInterface) {
        try {
            let fixture = await this.model.findOne({ matchCode: id });

            if (!fixture) throw new AppError('Fixture not found', 404)

            fixture = await this.model.findOneAndUpdate({ matchCode: id }, fixtureInfo, { new: true, runValidators: true });

            return fixture;

        } catch (error) {
            throw error;
        }

    }

    async deleteFixture(id: string) {
        try {
            let fixture = await this.model.findOne({ matchCode: id });

            if (!fixture) throw new AppError('Fixture not found', 404)

            fixture = await this.model.findOneAndDelete({ matchCode: id });

            return fixture;

        } catch (error) {
            throw error;
        }

    }
}

export const FixtureRepo = new FixtureRepository();