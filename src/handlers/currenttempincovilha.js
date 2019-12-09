const { storageGetEvent: handleGetEvent } = require('../storage/storage-get-event');

exports.getEventHandler = async event => {
    const _id = event._id || 'currenttempincovilha';
    return await handleGetEvent({
        ...event,
        _id
    });
};
