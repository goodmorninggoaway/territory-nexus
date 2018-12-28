const getDatabase = require('./mongo');
const { ObjectId } = require('mongodb');
const Notification = require('./notifications');

exports.addCongregation = async ({ congregation: dto, sendNotification = false }) => {
    const db = await getDatabase();

    const { ops: [congregation] } = await db.collection('congregation').insertOne({
        ...dto,
        _id: new ObjectId(new Date().valueOf()).toHexString(),
    }, {
        w: 'majority',
    });

    if (sendNotification) {
        const [{ name, email }] = congregation.users;
        await new Notification(Notification.types.CREATED_CONGREGATION)
            .asEmail()
            .to(`${name} <${email}>`)
            .properties({ congregation })
            .send();
    }

    return congregation;
};

exports.updateCongregation = async ({ congregationId, congregation: dto }) => {
    const db = await getDatabase();

    const response = await db.collection('congregation').findOneAndUpdate({ _id: { $eq: congregationId } }, { $set: dto }, {
        returnOriginal: false,
    });

    return response.value;
};

exports.deleteCongregation = async ({ congregationId }) => {
    const db = await getDatabase();

    const response = await db.collection('congregation').deleteOne({ _id: { $eq: congregationId } });

    return response.value;
};
