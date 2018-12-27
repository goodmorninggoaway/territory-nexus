const Joi = require('joi');
const HttpStatusCodes = require('http-status-codes');
const addCongregation = require('../../domain/congregation').addCongregation;

exports.plugin = {
    version: '1',
    name: 'tnx-congregation-router',
    dependencies: {},
    async register(server, options) {
        server.route({
            method: 'POST',
            path: '/',
            async handler(req, h) {
                try {
                    const { payload } = req;
                    const congregation = await addCongregation({ congregation: payload });
                    return h.response(congregation).code(HttpStatusCodes.CREATED);
                } catch (e) {
                    return h.response(e).code(HttpStatusCodes.INTERNAL_SERVER_ERROR);
                }
            },
            options: {
                validate: {
                    payload: Joi.object({
                        name: Joi.string().min(3).required().description('Name of the congregation, group, or pre-group'),
                        language: Joi.string().min(2).required().description('Primary language'),
                        alternateLanguages: Joi.array().items(Joi.string().required()).description('Other languages this congregation is responsible for.'),
                    }),
                    options: {
                        stripUnknown: true,
                    },
                },
            },
        });
    },

};
