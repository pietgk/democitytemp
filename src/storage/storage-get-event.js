const { EventStorage, StorageClose, findOne } = require('./storage-mongodb');
const { validateIsGET } = require('../lib/validate-httpmethod');
const { ResponceOk, ResponceError } = require('../lib/api-gateway');

/**
 * Simplest get specific event from evens database table
 */
exports.storageGetEvent = async event => {
    validateIsGET(event);
    let storage;
    try {
        storage = await EventStorage(event.stage)();
        const events = storage.collection;
        let result = await findOne(events, { _id: event._id });
        response = ResponceOk(result);
    } catch (exception) {
        response = ResponceError(exception);
    }
    await StorageClose(storage);
    return response;
};

