const HttpStatusCodes = require('http-status-codes');
const Joi = require('joi');
const getCongregations = require('../../domain/congregation').getCongregations;
const deleteCongregation = require('../../domain/congregation').deleteCongregation;
const UpdateCongregationRequestValidator = require('./schemas').UpdateCongregationRequestValidator;
const updateCongregation = require('../../domain/congregation').updateCongregation;
const CreateCongregationRequestValidator = require('./schemas').CreateCongregationRequestValidator;
const Congregation = require('./schemas').Congregation;
const addCongregation = require('../../domain/congregation').addCongregation;

exports.plugin = {
    version: '1',
    name: 'tnx-congregations-router',
    dependencies: {},
    async register(server, options) {
        server.route({
            method: 'GET',
            path: '/',
            async handler(req, h) {
                const congregations = await getCongregations();

                return h.response(congregations);
            },
            options: {
                tags: ['api'],
                response: {
                    status: {
                        [HttpStatusCodes.OK]: Joi.array().items(Congregation),
                    },
                },
            },
        });

        server.route({
            method: 'POST',
            path: '/',
            async handler(req, h) {
                const { payload: { name, language, admin, alternateLanguages } } = req;
                const dto = {
                    name,
                    language,
                    alternateLanguages,
                    users: [
                        { name: admin.name, email: admin.email },
                    ],
                };

                const congregation = await addCongregation({ congregation: dto, sendNotification: true });

                return h.response(congregation).code(HttpStatusCodes.CREATED);
            },
            options: {
                tags: ['api'],
                validate: {
                    ...CreateCongregationRequestValidator,
                    options: {
                        stripUnknown: true,
                    },
                },
                response: {
                    status: {
                        [HttpStatusCodes.CREATED]: Congregation,
                    },
                },
            },
        });

        server.route({
            method: 'PUT',
            path: '/{congregationId}',
            async handler(req, h) {
                const { payload: { name, language, alternateLanguages }, params: { congregationId } } = req;
                const dto = {
                    name,
                    language,
                    alternateLanguages,
                };

                const congregation = await updateCongregation({ congregationId, congregation: dto });

                return h.response(congregation);
            },
            options: {
                tags: ['api'],
                validate: {
                    ...UpdateCongregationRequestValidator,
                    options: {
                        stripUnknown: true,
                    },
                },
                response: {
                    status: {
                        [HttpStatusCodes.OK]: Congregation,
                    },
                },
            },
        });

        server.route({
            method: 'DELETE',
            path: '/{congregationId}',
            async handler(req, h) {
                const { params: { congregationId } } = req;
                const congregation = await deleteCongregation({ congregationId });

                return h.response(congregation).code(HttpStatusCodes.OK);
            },
            options: {
                tags: ['api'],
                response: {
                    status: {
                        [HttpStatusCodes.OK]: true,
                    },
                },
            },
        });
    },

};
