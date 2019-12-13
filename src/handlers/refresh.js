const { putEvent } = require('../storage/storage-put-event');
const { getCurrentTemperaturInCohilva } = require('../sources/source-weather');
const { ResponceOk, ResponceError } = require('../lib/api-gateway');

exports.refreshHandler = async event => {
    const _id = 'currenttempincovilha'; // TODO add sfax in the loop
    const { stage } = event;
    let results = [];
    try {
        const data = await getCurrentTemperaturInCohilva();
        const result = await putEvent(stage, { _id, ...data });
        results.push(result);
    } catch (e) {
        return ResponceError(e);
    }
    return ResponceOk(results);
};
