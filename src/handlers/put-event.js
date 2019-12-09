const { putEvent } = require('../storage/storage-put-event');

/**
 * HTTP post method to add one event to a MongoDB Atlas events collection.
 */
exports.putEventHandler = async event => {
    const { body, httpMethod, stage = 'prod' } = event;
    if (httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${httpMethod} method.`);
    }
    const eventBody = JSON.parse(body);
    return await putEvent(stage, eventBody);
};

// TODO storage (mongoDb) validator on stage and required event fields http://mongodb.github.io/node-mongodb-native/3.2/tutorials/collections/
// TODO create indexes when required