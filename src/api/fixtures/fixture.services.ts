import { FixtureRepo } from './fixture.repository'
import { FixtureInterface, FixtureData } from '@/common/model/fixture'
import { fixtureStatus } from '@/common/constants'
import { AppError } from '@/common/utils/error';



export class FixtureServices {
    async createFixture(fixture: FixtureInterface) {
        try {
            const newFixture = await FixtureRepo.createFixture(fixture)

            return newFixture;
        } catch (error) {
            throw error;
        }
    }


    async getFixture(id: string) {
        try {
            const fixture = await FixtureRepo.getFixture(id)

            return fixture;
        } catch (error) {
            throw error;
        }
    }

    async getFixtures() {
        try {
            const fixture = await FixtureRepo.getFixtures()

            return fixture;
        } catch (error) {
            throw error;
        }
    }

    async updateFixture(id: string, fixture: FixtureInterface) {
        try {
            const updatedFixture = await FixtureRepo.updateFixture(id, fixture)

            return updatedFixture;
        } catch (error) {
            throw error;
        }
    }

    async deleteFixture(id: string) {
        try {
            const deletedFixture = await FixtureRepo.deleteFixture(id)

            return deletedFixture;
        } catch (error) {
            throw error;
        }
    }

    async generateFixtureLink(id: string) {
        try {
            const fixture: FixtureData | any = await FixtureRepo.getFixture(id)

            if (fixture.matchLink && fixture.matchLink.length > 1) return fixture.matchLink;

            let link = fixture.generateFixtureLink()

            return link;
        } catch (error) {
            throw error;
        }
    }

    async getFixturesByStatus(status: string) {
        try {
            if (status !== fixtureStatus.PENDING && status !== fixtureStatus.COMPLETED) {
                throw new AppError('Invalid status', 400)
            }

            const fixtures = await FixtureRepo.getFixtures({ matchStatus: status })

            return fixtures;
        } catch (error) {
            throw error;
        }

    }
}

export const FixtureService = new FixtureServices();