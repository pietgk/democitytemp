const { EventStorage, StorageClose, replaceOne } = require('../storage/storage-mongodb');
const { ResponceOk } = require('../lib/api-gateway');

exports.putEvent = async (stage, event) => {
    const storage = await EventStorage(stage);
    console.log('putEvent storage:', storage);
    const result = await replaceOne(storage.events, event);
    console.log('putEvent result:', result);
    await StorageClose(storage);
    return ResponceOk(result);
};
