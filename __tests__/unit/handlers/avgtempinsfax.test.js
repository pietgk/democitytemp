const lambda = require('../../../src/handlers/avgtempinsfax');
const { insertMockEvent } = require('../../../src/storage/storage-insert-mock-event');
const stage = 'test';
const httpMethod = 'GET';

jest.setTimeout(20000); // 20 second timeout

describe('avgtempinsfax', () => {
    it('should fetch the avgtempinsfax from the database events collection', async () => {
        const _id = 'avgtempinsfax.lambda.test';
        const mockEvent = { _id, city: 'sfax', temperature: '12', unit: 'C' };
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
