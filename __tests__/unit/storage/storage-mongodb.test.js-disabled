const { EventStorage, StorageClose, insertOne, cleanOne, findOne } = require('../../../src/storage/storage-mongodb');
const lambda = require('../../../src/handlers/put-event.js');
const stage = 'test';

jest.setTimeout(20000); // 20 second timeout

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
        const _id = 'moon-event-id';

        await cleanOne(events, _id);

        const mockEvent = { _id, city: 'paris', temperature: '11', unit: 'C' };
        await insertOne(events, mockEvent);

        const insertedEvent = await findOne(events, { _id });
        expect(insertedEvent).toEqual(mockEvent);
        await cleanOne(events, _id);
    });
});

