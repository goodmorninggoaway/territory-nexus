const getDatabase = require('./mongo');
const albaLocations = require('./constants').albaLocations;

exports.addForeignLocationExport = async function addForeignLocationExport({ congregationId, payload }) {
    const db = await getDatabase();
    const result = await db.collection('foreignData').insertOne({
        congregationId,
        payload,
        source: albaLocations,
    }, {
        w: 'majority',
    });

    return result.insertedId;
};
