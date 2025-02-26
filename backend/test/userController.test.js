import request from 'supertest';
import app from '../index'; // Adjust the path to your app entry point
import SequelizeMock from 'sequelize-mock'; // Import sequelize-mock
import UserModel from '../model/user/User'; // Import the User model

const DBConnectionMock = new SequelizeMock(); // Create a mock connection
const UserMock = DBConnectionMock.define('User', UserModel); // Mock the User model

describe('User Controller', () => {
  beforeAll(async () => {
    await DBConnectionMock.sync(); // Sync the mock database before tests
  });

  afterAll(async () => {
    await DBConnectionMock.close(); // Close the mock database connection after tests
  });

  it('should update user information', async () => {
    const response = await request(app)
      .put('/api/users/1') // Adjust the user ID as necessary
      .send({
        name: 'Updated User',
        email: 'updated@example.com',
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'User updated successfully');
  });

  it('should fetch user information', async () => {
    const response = await request(app)
      .get('/api/users/1'); // Adjust the user ID as necessary
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name');
  });

  it('should delete a user', async () => {
    const response = await request(app)
      .delete('/api/users/1'); // Adjust the user ID as necessary
    expect(response.status).toBe(204); // No content on successful delete
  });

  // Add more test cases as needed
});
