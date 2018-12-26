const { MongoClient } = require('mongodb');
const { mongoDbUrl } = require('./config');

let db;
const init = async () => {
    const client = new MongoClient(mongoDbUrl);
    await client.connect();
    db = client.db('vendex-nexus');

    await db.createCollection('foreignData');
};

async function resetDB() {
    await init();
    await db.dropDatabase();
    db = undefined;
}

module.exports = async function getDB() {
    if (!db) {
        await init();
    }

    return db;
};

module.exports.reset = resetDB;
