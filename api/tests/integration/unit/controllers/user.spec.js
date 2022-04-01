const usersController = require('../../../../controllers/users')
const User = require('../../../../models/user');
const pg = require('pg');
jest.mock('pg')
const db = require('../../../../dbConfig/init');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson }))
const mockRes = { status: mockStatus }

describe('users controller', () => {
    beforeEach(() =>  jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

        test('it returns users with a 200 status code', async () => {
            jest.spyOn(User,'all', 'get')
                 .mockResolvedValue(['author1', 'author2']);
            await usersController.getAll(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(['author1', 'author2']);
        })


        // test('it adds rupees', async() => 
        // {
        //     jest.spyOn(db, 'query')
        //             .mockResolvedValueOnce({id: 1});
        //     let result = await User.addRupees(1);
        //     expect(result).toBe('success');
        // })
    

})