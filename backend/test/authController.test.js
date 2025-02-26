const request = require('supertest');
const app = require('../index'); // Adjust the path to your app entry point
const { sequelize } = require('../model'); // Import your sequelize instance
const SequelizeMock = require('sequelize-mock'); // Import sequelize-mock

const DBConnectionMock = new SequelizeMock(); // Create a mock connection

describe('Auth Controller', () => {
  beforeAll(async () => {
    await DBConnectionMock.sync(); // Sync the mock database before tests
  });

  afterAll(async () => {
    await DBConnectionMock.close(); // Close the mock database connection after tests
  });

  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  // Add more test cases as needed
});
