const Joi = require('joi');
const HttpStatusCodes = require('http-status-codes');
const addForeignLocationExport = require('../../domain/alba').addForeignLocationExport;

exports.plugin = {
    version: require('../../package.json').version,
    name: 'alba-router',
    dependencies: {},
    async register(server, options) {
        server.route({
            method: 'POST',
            path: '/foreign/location-import/csv',
            async handler(req, h) {
                try {
                    const { payload } = req.payload;
                    const id = await addForeignLocationExport({ payload, congregationId: 1 });
                    return h.response({ id }).code(HttpStatusCodes.CREATED);
                } catch (e) {
                    return h.response(e).code(HttpStatusCodes.INTERNAL_SERVER_ERROR);
                }
            },
            options: {
                validate: {
                    payload: Joi.object({
                        payload: Joi.string().required().description('CSV or TSV Alba export'),
                    }),
                },
            },
        });
    },
};
