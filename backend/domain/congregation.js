const getDatabase = require('./mongo');

exports.addCongregation = async function addForeignLocationExport({ congregation }) {
    const db = await getDatabase();
    const result = await db.collection('congregation').insertOne(congregation, {
        w: 'majority',
    });

    return result.ops[0];
};
