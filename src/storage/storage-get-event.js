const { EventStorage, StorageClose, findOne } = require('./storage-mongodb');
const { validateIsGET } = require('../lib/validate-httpmethod');
const { ResponceOk } = require('../lib/api-gateway');

/**
 * Get specific event from evens database table
 */
exports.storageGetEvent = async event => {
    validateIsGET(event);
    const storage = await EventStorage(event.stage);
    const result = await findOne(storage.events, { _id: event._id });
    await StorageClose(storage);
    return ResponceOk(result);
};

