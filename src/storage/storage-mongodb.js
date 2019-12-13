const { MongoClient } = require('mongodb');
const { demoSecrets } = require('../lib/secrets');

exports.cleanOne = (events, _id) => {
    return new Promise((resolve, reject) => {
        events.findOneAndDelete({ _id }, function(err, r) {
            if (err != null) {
                reject(err);
            } else {
                const { lastErrorObject, ok, value } = r;
                resolve({
                    _id,
                    lastErrorObject,
                    ok,
                    value
                });
            }
        });
    });
};

exports.findOne = (events, event) => {
    return new Promise((resolve, reject) => {
        events.findOne(event, function(err, r) {
            if (err != null) {
                reject(err);
            } else {
                resolve(r);
            }
        });
    });
};

exports.insertOne = (events, event) => {
    return new Promise((resolve, reject) => {
        events.insertOne(event, function(err, r) {
            if (err != null) {
                reject(err);
            } else {
                const { insertedCount, insertedId } = r;
                resolve({
                    insertedCount,
                    insertedId,
                    event
                });
            }
        });
    });
};

exports.replaceOne = (events, event) => {
    return new Promise((resolve, reject) => {
        const _id = event._id;
        events.replaceOne({ _id }, event, { upsert: true }, function (err, r) {
            if (err != null) {
                reject(err);
            } else {
                const { modifiedCount, matchedCount } = r;
                resolve({
                    modifiedCount,
                    matchedCount,
                    event
                });
            }
        });
    });
};

exports.StorageClose = async ({ dbClient }) => {
    // db && await db.close();
    dbClient && (await dbClient.close());
};

exports.StorageClient = ({ databaseName, collectionName, stage = 'prod' }) => {
    return async () => {
        if (stage !== 'prod' && stage != 'acc' && stage !== 'test' && stage !== 'dev') {
            stage = 'test';
        }
        try {
            const secrets = await demoSecrets;
            const dbUri = secrets['events-db-url']; // 'mongodb+srv://<username>:<password>@cluster0-egx8l.mongodb.net/test?retryWrites=true&w=majority';
            const dbClient = await MongoClient.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
            const db = dbClient.db(`${stage}_${databaseName}`);
            const collection = db.collection(collectionName); // TODO should use strict and callback
            return { dbClient, db, collection };
        } catch (err) {
            return { err }
        }
    };
};


exports.EventStorage = async (stage = 'prod') => {
    const databaseName = 'events';
    const collectionName = 'events';
    const { dbClient, db, collection: events, err } = await exports.StorageClient({ stage, databaseName, collectionName })();
    return { dbClient, db, events, err };
}
