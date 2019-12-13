const { EventStorage, StorageClose, replaceOne } = require('../storage/storage-mongodb');
const { ResponceOk } = require('../lib/api-gateway');

exports.putEvent = async (stage, event) => {
    const storage = await EventStorage(stage);
    const result = await replaceOne(storage.events, event);
    await StorageClose(storage);
    return ResponceOk(result);
};
