const { putEvent } = require('../storage/storage-put-event');
const { getCurrentTemperaturInCohilva } = require('../sources/source-weather');

exports.refreshHandler = async event => {
    const _id = 'currenttempincovilha'; // TODO add sfax in the loop
    const { stage } = event;
    let statusCode = 200;
    let results = [];
    try {
        const data = await getCurrentTemperaturInCohilva();
        const result = await putEvent(stage, { _id, ...data });
        results.push(result);
    } catch (e) {
        statusCode = 500;
        result = { exception: e.message };
        results.push(result);
    }
    return {
        statusCode,
        body: JSON.stringify(results)
    }
};
