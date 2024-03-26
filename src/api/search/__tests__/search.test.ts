import request from 'supertest';
import express, { Express } from 'express';
import { app } from '@/server';
import db from '@/db'
import { User } from '@/common/model/user';
import { Server } from 'http'

let token: string;
let server: Server;


beforeAll(async () => {
    await db.connect();
    server = app.listen(80);
    await User.deleteOne({ username: 'testuser' });
    const userData = {
        username: 'testsruser',
        password: 'testpassword',
        email: 'testsr@mail.com',
        role: 'user',
        displayName: 'Test User'
    };
    let response = await request(server).post('/auth/signup').send(userData);

    const credentials = {
        password: 'testpassword',
        email: 'testsr@mail.com',
    };

    response = await request(app).post('/auth/login').send(credentials);
    token = response.body.token;

});

afterAll(async () => {
    await db.disconnect();
    server.close()

});


describe('Search Endpoints', () => {
    describe('Search Teams', () => {
        it('should return all teams', async () => {
            const response = await request(app)
                .get('/pl/teams')
                .set('Authorization', `Bearer ${token}`)
                .send();

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('Search Pending Fixtures', () => {
        it('should return all pending fixtures', async () => {
            const response = await request(app)
                .get('/pl/fixtures/pending')
                .set('Authorization', `Bearer ${token}`)
                .send();

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('Search Completed Fixtures', () => {
        it('should return all completed fixtures', async () => {
            const response = await request(app)
                .get('/pl/teams')
                .set('Authorization', `Bearer ${token}`)
                .send();

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('Search Single Team and Fixtures', () => {
        it('should return information about a single team', async () => {
            const response = await request(app).get('/pl/search/CHF').send();

            expect(response.status).toBe(200);
        });
    });

    describe('Search Multiple Teams and Fixtures', () => {
        it('should return information about multiple teams and their fixtures', async () => {
            const response = await request(app)
                .get('/pl/search')
                .query({ team1: 'CBF', team2: 'RFC', team3: 'CHF' })
                .send();

            expect(response.status).toBe(200);


        });
    });

}); 