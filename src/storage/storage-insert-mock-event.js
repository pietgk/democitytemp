const { EventStorage, StorageClose, cleanOne, insertOne } = require('./storage-mongodb');

/**
 * Simplest get specific event from evens database table
 */
exports.insertMockEvent = async event => {
    const { stage, ...mockEvent } = event;
    const storage = await EventStorage(stage)();
    const events = storage.collection;
    await cleanOne(events, mockEvent._id);
    const result = await insertOne(events, mockEvent);
    await StorageClose(storage);
    return result;
};
