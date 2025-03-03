const SequelizeMock = require('sequelize-mock');
import ShrdExpense from '../model/shrdExpense/ShrdExpense';

const DBMock = new SequelizeMock();
const ShrdExpenseMock = DBMock.define('ShrdExpense', {
    Id: 1,
    Name: 'Test Expense',
    Amount: 100.00,
    Agent: 1,
    Status: 'unpaid',
});

describe('ShrdExpense Model', () => {
    it('should create a new shared expense with all values', async () => {
        const expense = await ShrdExpenseMock.create({
            Id: 1,
            Name: 'Test Expense',
            Amount: 100.00,
            Agent: 1,
            Status: 'unpaid',
        });
        expect(expense.Id).toBe(1);
        expect(expense.Name).toBe('Test Expense');
        expect(expense.Amount).toBe(100.00);
        expect(expense.Agent).toBe(1);
        expect(expense.Status).toBe('unpaid');
    });

});
