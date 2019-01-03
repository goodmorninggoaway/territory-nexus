const HttpStatusCodes = require('http-status-codes');
const Joi = require('joi');
const getCongregation = require('../../domain/congregation').getCongregation;
const deleteCongregation = require('../../domain/congregation').deleteCongregation;
const UpdateCongregationRequestValidator = require('./schemas').UpdateCongregationRequestValidator;
const updateCongregation = require('../../domain/congregation').updateCongregation;
const CreateCongregationRequestValidator = require('./schemas').CreateCongregationRequestValidator;
const Congregation = require('./schemas').Congregation;
const addCongregation = require('../../domain/congregation').addCongregation;

exports.plugin = {
    version: '1',
    name: 'tnx-congregation-router',
    dependencies: {},
    async register(server, options) {
        server.route({
            method: 'GET',
            path: '/',
            async handler(req, h) {
                const { aud } = req.auth.credentials;
                if (!aud || !aud.startsWith('urn:congregation')) {
                    return h.response().code(HttpStatusCodes.BAD_REQUEST);
                }

                const congregationId = aud.split('urn:congregation:')[1];
                const congregation = await getCongregation(congregationId);

                if (congregation) {
                    return h.response(congregation);
                } else {
                    return h.response().code(HttpStatusCodes.NOT_FOUND);
                }
            },
            options: {
                tags: ['api'],
                response: {
                    status: {
                        [HttpStatusCodes.OK]: Congregation,
                        [HttpStatusCodes.NOT_FOUND]: Joi.empty(),
                    },
                },
            },
        });

        server.route({
            method: 'PUT',
            path: '/',
            async handler(req, h) {
                const { aud } = req.auth.credentials;
                if (!aud || !aud.startsWith('urn:congregation')) {
                    return h.response().code(HttpStatusCodes.BAD_REQUEST);
                }

                const congregationId = aud.split('urn:congregation:')[1];
                const congregation = await updateCongregation({ congregationId, congregation: req.payload });

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
            path: '/',
            async handler(req, h) {
                const { aud } = req.auth.credentials;
                if (!aud || !aud.startsWith('urn:congregation')) {
                    return h.response().code(HttpStatusCodes.BAD_REQUEST);
                }

                const congregationId = aud.split('urn:congregation:')[1];
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
