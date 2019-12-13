const { putEvent } = require('../storage/storage-put-event');
const { getCurrentTemperaturInCohilva } = require('../sources/source-weather');
const { ResponceOk } = require('../lib/api-gateway');

exports.refreshHandler = async event => {
    try {
        console.log('refreshHandler event:', event);
        const _id = 'currenttempincovilha'; // TODO add sfax in the loop
        const { stage } = event;
        console.log('stage:', stage);
        const data = await getCurrentTemperaturInCohilva();
        console.log('data:', data);
        const result = await putEvent(stage, { _id, ...data });
        console.log('result:', result);
        return ResponceOk('Ok');
    } catch (e) {
        throw new Error(`refreshHandler exception: ${JSON.stringify(e)}`);
    }
};
