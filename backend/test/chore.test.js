const SequelizeMock = require('sequelize-mock');
import Chore from '../model/chore/Chore';

const DBMock = new SequelizeMock();
const ChoreMock = DBMock.define('Chore', {
    Id: 1,
    Name: 'Test Chore',
    Date: new Date(),
    Status: 'Pending',
    UserId: 1,
    Days: null,
});

describe('Chore Model', () => {
    it('should create a new chore with all values', async () => {
        const chore = await ChoreMock.create({
            Id: 1,
            Name: 'Test Chore',
            Date: new Date(),
            Status: 'Pending',
            UserId: 1,
            Days: null,
        });
        expect(chore.Id).toBe(1);
        expect(chore.Name).toBe('Test Chore');
        expect(chore.Date).toBeInstanceOf(Date);
        expect(chore.Status).toBe('Pending');
        expect(chore.UserId).toBe(1);
        expect(chore.Days).toEqual(null);
    });

});
