const lambda = require('../../../src/handlers/currenttempincovilha');
const { insertMockEvent } = require('../../../src/storage/storage-insert-mock-event');
const stage = 'test';
const httpMethod = 'GET';

jest.setTimeout(20000); // 20 second timeout
// TODO see if we want in memory mongodb as unit test context 
// and this as integration test.
// currently i like testing the same as prod.

// TODO test errors
describe('currenttempincovilha', () => {
    it('should fetch the currenttempincovilha from the database events collection', async () => {
        const _id = 'currenttempincovilha.lambda.test';
        const mockEvent = { _id, city: 'covilha', temperature: '15', unit: 'C' };
        const mockInsertResult = await insertMockEvent({ stage, ...mockEvent });
        const event = {
            httpMethod,
            stage,
            _id
        };
        const responce = await lambda.getEventHandler(event);
 
        expect(mockInsertResult.insertedCount).toEqual(1);
        expect(mockInsertResult.insertedId).toEqual(_id);
        expect(responce.statusCode).toEqual(200);
        expect(responce.result).not.toEqual("null");
        expect(responce).toMatchSnapshot();
    });
});
