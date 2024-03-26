import request from 'supertest';
import express, { Express } from 'express';
import { app } from '@/server';
import db from '@/db'
import { User } from '@/common/model/user';
import { Fixture } from '@/common/model/fixture'
import { Server } from 'http'

let token: string;
let server: Server;

beforeAll(async () => {
    await db.connect();
    server = app.listen(80);
    await User.deleteOne({ username: 'adminuser' });
    await Fixture.deleteOne({ matchCode: 'RFCCHF' });
    const userData = {
        username: 'adminfixuser',
        password: 'testpassword',
        email: 'adminfix@mail.com',
        role: 'admin',
        displayName: 'Test User'
    };
    let response = await request(server).post('/auth/signup').send(userData);

    const credentials = {
        password: 'testpassword',
        email: 'adminfix@mail.com',
    };

    response = await request(server).post('/auth/login').send(credentials);
    token = response.body.token;

});

afterAll(async () => {
    await db.disconnect();
    server.close()

});

describe('Fixtures Endpoints', () => {
    describe('Create Fixture', () => {
        it('should create a new fixture', async () => {
            const fixtureData = {
                homeTeam: 'RFC',
                awayTeam: 'CHF',
            };

            const response = await request(server)
                .post('/fixtures')
                .set('Authorization', `Bearer ${token}`)
                .send(fixtureData);



            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('homeTeam');
            expect(response.body.homeTeam).toHaveProperty('teamCode', 'RFC');

        });
    });

    describe('Get Fixtures', () => {
        it('should return all fixtures', async () => {
            const response = await request(server)
                .get('/fixtures')
                .set('Authorization', `Bearer ${token}`)
                .send();

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('Get Fixture', () => {
        it('should return a single fixture', async () => {
            const response = await request(server)
                .get('/fixtures/RFCCHF')
                .set('Authorization', `Bearer ${token}`)
                .send();

            expect(response.status).toBe(200);
            expect(response.body[0]).toHaveProperty('homeTeam');

        });
    });

    describe('Update Fixture', () => {
        it('should update a fixture', async () => {
            const fixtureData = {
                matchStatus: 'completed'
            };

            const response = await request(server)
                .put('/fixtures/RFCCHF')
                .set('Authorization', `Bearer ${token}`)
                .send(fixtureData);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('matchStatus', 'completed');
        });
    });

    describe('Delete Fixture', () => {
        it('should delete a fixture', async () => {
            const response = await request(server)
                .delete('/fixtures/RFCCHF')
                .set('Authorization', `Bearer ${token}`)
                .send();

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('homeTeam');

        });
    });


});