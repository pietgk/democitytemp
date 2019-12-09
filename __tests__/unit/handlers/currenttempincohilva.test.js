const lambda = require('../../../src/handlers/currenttempincovilha');
const { insertMockEvent } = require('../../../src/storage/storage-insert-mock-event');
const stage = 'test';
const httpMethod = 'GET';

describe('currenttempincovilha', () => {
    it('should fetch the currenttempincovilha from the database events collection', async () => {
        const _id = 'currenttempincovilha';
        const mockEvent = { _id, city: 'covilha', temperature: '15', unit: 'C' };
        const mockInsertResult = await insertMockEvent({ stage, ...mockEvent });
        const event = {
            httpMethod,
            stage
        };
        const responce = await lambda.getEventHandler(event);
 
        expect(mockInsertResult.insertedCount).toEqual(1);
        expect(mockInsertResult.insertedId).toEqual(_id);
        expect(responce.statusCode).toEqual(200);
        expect(responce.result).not.toEqual("null");
        expect(responce).toMatchSnapshot();
    });
});
