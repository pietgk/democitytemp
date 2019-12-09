const { EventStorage, StorageClose, findOne } = require('./storage-mongodb');
const { validateIsGET } = require('../lib/validate-httpmethod');

/**
 * Simplest get specific event from evens database table
 */
exports.storageGetEvent = async event => {
    validateIsGET(event);
    let storage;
    const _id = event._id;
    try {
        storage = await EventStorage(event.stage)();
        const events = storage.collection;
        let result = await findOne(events, { _id });
        response = {
            statusCode: 200,
            body: JSON.stringify(result)
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
