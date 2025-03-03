const SequelizeMock = require('sequelize-mock');
import User from '../model/user/User';

const DBMock = new SequelizeMock();
const UserMock = DBMock.define('User', {
    Id: 1,
    Name: 'Test User',
    Contact: '1234567890',
    Email: 'testuser@example.com',
    Photo: null,
    Address: '123 Test St',
    Password: 'password123',
    RoomId: null,
});

describe('User Model', () => {
    it('should create a new user with all values', async () => {
        const user = await UserMock.create({
            Id: 1,
            Name: 'Test User',
            Contact: '1234567890',
            Email: 'testuser@example.com',
            Photo: null,
            Address: '123 Test St',
            Password: 'password123',
            RoomId: null,
        });
        expect(user.Id).toBe(1);
        expect(user.Name).toBe('Test User');
        expect(user.Contact).toBe('1234567890');
        expect(user.Email).toBe('testuser@example.com');
        expect(user.Photo).toBe(null);
        expect(user.Address).toBe('123 Test St');
        expect(user.Password).toBe('password123');
        expect(user.RoomId).toBe(null);
    });

});
