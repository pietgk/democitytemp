const { EventStorage, StorageClose, cleanOne } = require('../../../src/storage/storage-mongodb');
const lambda = require('../../../src/handlers/refresh');
const stage = 'test';

jest.setTimeout(20000); // 20 second timeout

describe('refresh', () => {
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

    it('should update the database collection with the temperatures', async () => {
        const event = {
            stage,
            httpMethod: 'GET'
        };

        // const events = storage.collection;
        // await cleanOne(events, _id);
        const responce = await lambda.refreshHandler(event);

        expect(responce.statusCode).toEqual(200);
    });
});
