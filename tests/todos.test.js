const request = require('supertest');
const app = require('../src/app');

jest.mock('../src/db', () => ({
    query: jest.fn(),
}));

const db = require('../src/db');

describe('GET /health', () => {
    it('should return status ok', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('ok');
    });
});

describe('GET /todos', () => {
    it('should return list of todos', async () => {
        db.query.mockResolvedValue({
            rows: [{ id: 1, title: 'Learn Docker', done: false }],
        });

        const res = await request(app).get('/todos');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0].title).toBe('Learn Docker');
    });
});

describe('POST /todos', () => {
    it('should create a new todo', async () => {
        db.query.mockResolvedValue({
            rows: [{ id:2, title: 'Learn CI/CD', done: false }],
        });

        const res = await request(app)
            .post('/todos')
            .send({ title: 'Learn CI/CD' });

        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe('Learn CI/CD');
    });

    it('should return 400 if title is missing', async() => {
        const res = await request(app).post('/todos').send({});
        expect(res.statusCode).toBe(400); 
    });
});