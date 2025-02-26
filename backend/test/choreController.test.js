const request = require('supertest');
const app = require('../index'); // Adjust the path to your app entry point
const SequelizeMock = require('sequelize-mock'); // Import sequelize-mock

const DBConnectionMock = new SequelizeMock(); // Create a mock connection

describe('Chore Controller', () => {
  beforeAll(async () => {
    await DBConnectionMock.sync(); // Sync the mock database before tests
  });

  afterAll(async () => {
    await DBConnectionMock.close(); // Close the mock database connection after tests
  });

  it('should create a new chore', async () => {
    const response = await request(app)
      .post('/api/chores')
      .send({
        name: 'Test Chore',
        date: '2023-10-01',
        userId: 1, // Adjust based on your test data
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  // Add more test cases as needed
});
