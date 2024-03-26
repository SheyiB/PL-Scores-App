import request from 'supertest';
import express, { Express } from 'express';
import { app } from '@/server';
import db from '@/db'
import { User } from '@/common/model/user';
import { Server } from 'http'
import { Team } from '@/common/model/team'

let server: Server;
let token: string;
let teamData = {
    teamName: 'Ranjol FC',
    teamCode: 'RNJ',
}

beforeAll(async () => {
    await db.connect();
    server = app.listen(8088);
    await User.deleteOne({ username: 'adminuser' });
    await Team.deleteOne({ teamCode: 'RNJ' })
    const userData = {
        username: 'adminuser',
        password: 'testpassword',
        email: 'admin@mail.com',
        role: 'admin',
        displayName: 'Test User'
    };
    let response = await request(server).post('/auth/signup').send(userData);

    const credentials = {
        password: 'testpassword',
        email: 'admin@mail.com',
    };

    response = await request(server).post('/auth/login').send(credentials);
    token = response.body.token;

});

afterAll(async () => {
    await db.disconnect();
    server.close()

});


describe('Teams Endpoints', () => {
    describe('Create Team', () => {
        it('should create a new team', async () => {

            const response = await request(server)
                .post('/teams')
                .set('Authorization', `Bearer ${token}`)
                .send(teamData);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('teamName', 'Ranjol FC');
            expect(response.body).toHaveProperty('teamCode', 'RNJ');
        });
    });

    describe('Get Teams', () => {
        it('should get all teams', async () => {
            const response = await request(server)
                .get('/teams')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body.length).toBeGreaterThan(0);

        });
    });

    describe('Get Team', () => {
        it('should get a team', async () => {
            const response = await request(server)
                .get('/teams/RNJ')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('teamName', 'Ranjol FC');
            expect(response.body).toHaveProperty('teamCode', 'RNJ');
        });
    });


    describe('Update Team', () => {
        it('should update a team', async () => {


            const response = await request(server)
                .put('/teams/RNJ')
                .set('Authorization', `Bearer ${token}`)
                .send({ teamName: 'Real FC' });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('teamName', 'Real FC');
            expect(response.body).toHaveProperty('teamCode', 'RNJ');
        });
    });

    describe('Delete Team', () => {
        it('should delete a team', async () => {
            const response = await request(server)
                .delete('/teams/RNJ')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('teamCode', 'RNJ');
        });
    }
    );
});