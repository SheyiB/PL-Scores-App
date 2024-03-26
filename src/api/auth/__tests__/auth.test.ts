import request from 'supertest';
import express, { Express } from 'express';
import { app } from '../../../server';
import db from '../../../db'
import { User } from '@/common/model/user';
import { Server } from 'http'

let server: Server;

beforeAll(async () => {
    await db.connect();
    server = app.listen(433);
    await User.deleteOne({ username: 'testuser' });

});

afterAll(async () => {
    await db.disconnect();
    server.close()

});


describe('Auth Endpoints', () => {
    describe('Signup', () => {
        it('should create a new user', async () => {
            const userData = {
                username: 'testuser',
                password: 'testpassword',
                email: 'test@mail.com',
                role: 'user',
                displayName: 'Test User'
            };

            const response = await request(app).post('/auth/signup').send(userData);
            expect(response.status).toBe(201);
        });
    });

    describe('Login', () => {
        it('should login a user', async () => {
            const credentials = {
                email: 'jil@bafuto.com',
                password: '12345',
            };

            const response = await request(app).post('/auth/login').send(credentials);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
        });
    });
});