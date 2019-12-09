const { EventStorage, StorageClose, insertOne } = require('../storage/storage-mongodb');

exports.putEvent = async (stage, event) => {
    let response;
    let storage;
    try {
        storage = await EventStorage(stage)();
        const events = storage.collection;
        let result = await insertOne(events, event);
        response = {
            statusCode: 200,
            ...result
        };
    } catch (exception) {
        response = {
            statusCode: 500,
            exception
        };
    }
    await StorageClose(storage);
    return response;
};
