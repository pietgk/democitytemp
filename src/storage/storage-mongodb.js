const { MongoClient } = require('mongodb');
const { demoSecrets } = require('../lib/secrets');

exports.StorageClient = ({ databaseName, collectionName, stage = 'prod' }) => {
    return async () => {
        if (stage !== 'prod' && stage != 'acc' && stage !== 'test' && stage !== 'dev') {
            stage = 'test';
        }
        const secrets = await demoSecrets;
        const dbUri = secrets['events-db-url']; // 'mongodb+srv://<username>:<password>@cluster0-egx8l.mongodb.net/test?retryWrites=true&w=majority';
        const mogeClient = await MongoClient.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = mogeClient.db(`${stage}_${databaseName}`);
        const collection = db.collection(collectionName); // TODO should use strict and callback

        return { mogeClient, db, collection };
    };
};

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

exports.StorageClose = async ({ dbClient }) => {
    // db && await db.close();
    dbClient && (await dbClient.close());
};

const databaseName = 'events';
const collectionName = 'events';
exports.EventStorage = (stage = 'prod') => exports.StorageClient({ stage, databaseName, collectionName });
