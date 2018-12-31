const Joi = require('joi');
const HttpStatusCodes = require('http-status-codes');
const { signToken } = require('./jwt');

const generateCookieAndRedirect = async (req, h, { name, email }) => {
    const token = await signToken({ id: email, email, name });

    console.debug('Login success with profile', req.auth.credentials.profile);

    return h
        .response(token)
        .state('token', token.token, {
            path: '/',
            isSecure: process.env.USE_SSL !== 'false',
        })
        .redirect(process.env.UI_URL);
};

const upgradeAuthToken = async (req, h, { claims, congregation }) => {
    const newClaims = { ...req.auth.credentials };
    if (congregation !== undefined) {
        newClaims.aud = `urn:congregation:${congregation}`;
    }

    const token = await signToken(newClaims);

    console.debug('Token upgrade success', token);

    return h
        .response(token)
        .state('token', token.token, {
            path: '/',
            isSecure: process.env.USE_SSL !== 'false',
        });
};

const enableGoogle = (server) => {
    server.auth.strategy('google', 'bell', {
        provider: 'google',
        password: process.env.OAUTH_COOKIE_PASSWORD,
        isSecure: process.env.USE_SSL,
        clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        location: process.env.OAUTH_REDIRECT_URI || server.info.uri,
    });

    server.route({
        method: '*',
        path: '/oauth/google',
        options: {
            auth: {
                strategy: 'google',
                mode: 'try',
            },
            handler: async function (request, h) {

                if (!request.auth.isAuthenticated) {
                    return 'Authentication failed due to: ' + request.auth.error.message;
                }

                return await generateCookieAndRedirect(request, h, {
                    name: request.auth.credentials.profile.displayName,
                    email: request.auth.credentials.profile.email,
                });
            },
        },
    });
};

const configureJwtSession = (server) => {
    server.register(require('hapi-auth-jwt2'));

    if (!process.env.TOKEN_SECRET) {
        throw new Error('Missing process.env.TOKEN_SECRET');
    }

    server.auth.strategy('jwt', 'jwt', {
        key: process.env.TOKEN_SECRET,
        async validate(decoded, req) {
            return { isValid: true };
        },
        verifyOptions: { algorithms: ['HS256'] },
    });

    if (process.env.NODE_ENV !== 'test') {
        server.auth.default('jwt');
    }
};

exports.plugin = {
    version: '1',
    name: 'tnx-authentication',
    dependencies: {},
    async register(server, options) {
        configureJwtSession(server);

        server.register(require('bell'));
        enableGoogle(server);

        server.route({
            method: 'PUT',
            path: '/',
            async handler(req, h) {
                // TODO Add access controls around this API
                return await upgradeAuthToken(req, h, req.payload);
            },
            options: {
                tags: ['api', 'auth'],
                validate: {
                    payload: Joi.object({
                        congregation: Joi.string().description('Set or change the aud claim to a specific congregation'),
                    }),
                    options: {
                        stripUnknown: true,
                    },
                },
                response: {
                    status: {
                        [HttpStatusCodes.OK]: Joi.object(),
                    },
                },
            },
        });

    },
};
