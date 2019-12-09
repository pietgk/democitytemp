const { EventStorage, StorageClose, insertOne, cleanOne, findOne } = require('../../../src/storage/storage-mongodb');
const lambda = require('../../../src/handlers/put-event.js');
const stage = 'test';

describe('MongoDb', () => {
    let storage;

    beforeAll(async () => {
        try {
            storage = await EventStorage(stage)();
        } catch (e) {
            console.log('Test putEventHandler beforeAll exception', e)        
        }
    });

    afterAll(async () => {
        await StorageClose(storage);
    });

    it('should insert an event as doc into collection', async () => {
        const events = storage.collection;
        const _id = 'paris-event-id';

        await cleanOne(events, _id);

        const mockEvent = { _id, city: 'paris', temperature: '11', unit: 'C'};
        await insertOne(events, mockEvent);

        const insertedEvent = await findOne(events, { _id });
        expect(insertedEvent).toEqual(mockEvent);
        await cleanOne(events, _id);
    });
});

describe('putEventHandler', () => {
    let storage;

    beforeAll(async () => {
        try {
            storage = await EventStorage(stage)();
        } catch (e) {
            console.log('Test putEventHandler beforeAll exception', e);
        }
    });

    afterAll(async () => {
        await StorageClose(storage);
    });

    it('should add event to the database collection', async () => {
        const events = storage.collection;
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
        expect(responce.insertedId).toEqual(_id);
        expect(responce.insertedCount).toEqual(1);
        await cleanOne(events, _id);
    });
});
