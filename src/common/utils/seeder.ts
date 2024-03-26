import mongoose from 'mongoose';
import { Team, TeamData } from '@/common/model/team';
import { Fixture, FixtureData } from '@/common/model/fixture';
import { fixtureStatus } from '@/common/constants/fixtureStatus';
import { faker } from '@faker-js/faker';
import { env } from '@/common/config/env';

/** 
 * 
// Generate sample team data using Faker.js
const generateTeamData = (numTeams: number): TeamData[] => {
    const teamData: TeamData[] = [];
    for (let i = 0; i < numTeams; i++) {
        const teamName = faker.animal.crocodilia()
        const teamCode = faker.random.alphaNumeric(3).toUpperCase();
        teamData.push({ teamName, teamCode });
    }
    return teamData;
};

// Generate sample fixture data using Faker.js and team codes
const generateFixtureData = (teams: TeamData[]): FixtureData[] => {
    const fixtureData: FixtureData[] = [];
    const numTeams = teams.length;

    for (let i = 0; i < numTeams - 1; i++) {
        for (let j = i + 1; j < numTeams; j++) {
            const homeTeam = teams[i]._id;
            const awayTeam = teams[j]._id;
            const homeScore = faker.datatype.number({ min: 0, max: 5 });
            const awayScore = faker.datatype.number({ min: 0, max: 5 });
            const matchCode = `${teams[i].teamCode}${teams[j].teamCode}`;
            const matchStatus = faker.helpers.randomize([fixtureStatus.PENDING, fixtureStatus.COMPLETED]);

            fixtureData.push({
                homeTeam,
                awayTeam,
                homeScore,
                awayScore,
                matchCode,
                matchStatus,
            });
        }
    }
    return fixtureData;
};

// Seed the database
const seedDatabase = async () => {
    try {
        // Clear existing data
        await Team.deleteMany({});
        await Fixture.deleteMany({});

        // Generate sample data using Faker.js
        const numTeams = 10;
        const teamData = generateTeamData(numTeams);
        const teams = await Team.insertMany(teamData);
        const fixtureData = generateFixtureData(teams);
        await Fixture.insertMany(fixtureData);

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.disconnect();
    }
};

seedDatabase();

**/

export async function seedDatabase() {
    // Connect to your MongoDB database
    await mongoose.connect(env.MONGODB_URI!);

    // Generate teams
    const teams = Array.from({ length: 10 }, () => ({
        teamName: `${faker.name.firstName()} FC`,
        teamCode: faker.random.alpha(3),
    })).map(teamData => new Team(teamData));

    await Team.insertMany(teams);

    // Generate fixtures
    const fixtures = teams.flatMap((team, index, self) => {
        const otherTeams = self.filter(t => t.id !== team.id);
        return otherTeams.map(otherTeam => ({
            homeTeam: team.id,
            awayTeam: otherTeam.id,
            homeScore: faker.number.int({ min: 0, max: 10 }),
            awayScore: faker.number.int({ min: 0, max: 10 }),
            matchCode: `${team.teamCode}${otherTeam.teamCode}`,
            matchStatus: faker.helpers.arrayElement([fixtureStatus.PENDING, fixtureStatus.COMPLETED]),
        }));
    }).map(fixtureData => new Fixture(fixtureData));

    await Fixture.insertMany(fixtures);

    console.log('Database seeded!');
}
