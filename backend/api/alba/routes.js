const Joi = require('joi');

exports.plugin = {
    version: require('../../package.json').version,
    name: 'alba-router',
    dependencies: {},
    async register(server, options) {
        server.route({
            method: 'POST',
            path: '/foreign/location-import/csv',
            async handler(req, h) {
                const { payload } = req.payload;
                return true;
            },
        });
    },
    options: {
        validate: {
            params: {
                payload: Joi.string().required().describe('CSV or TSV Alba export'),
            },
        },
    },

};
