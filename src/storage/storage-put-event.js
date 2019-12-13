const { EventStorage, StorageClose, replaceOne } = require('../storage/storage-mongodb');
const { ResponceOk, ResponceError } = require('../lib/api-gateway');

exports.putEvent = async (stage, event) => {
    let response;
    let storage;
    try {
        storage = await EventStorage(stage)();
        const events = storage.collection;
        let result = await replaceOne(events, event);
        response = ResponceOk(result);
    } catch (exception) {
        return ResponceError(exception);
    }
    await StorageClose(storage);
    return response;
};
