const { EventStorage, StorageClose, insertOne, cleanOne, findOne } = require('../../../src/storage/storage-mongodb');
const lambda = require('../../../src/handlers/put-event.js');
const stage = 'test';

jest.setTimeout(20000); // 20 second timeout

describe('putEventHandler', () => {
    let storage;

    beforeAll(async () => {
        try {
            storage = await EventStorage(stage);
        } catch (e) {
            console.log('Test putEventHandler beforeAll exception', e);
        }
    });

    afterAll(async () => {
        await StorageClose(storage);
    });

    it('should add event to the database events collection', async () => {
        const _id = 'amsterdam-event-id';
        const body = `{"_id": "${_id}","city":"amsterdam","temperature":"5", "unit": "C"}`;
        const event = {
            stage,
            httpMethod: 'POST',
            body
        };

        // await cleanOne(events, _id);
        const responce = await lambda.putEventHandler(event);
        
        expect(responce.statusCode).toEqual(200);
        //expect(responce.insertedId).toEqual(_id);
        //expect(responce.insertedCount).toEqual(1);
        //await cleanOne(events, _id);
    });
});
