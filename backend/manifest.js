const Boom = require('boom');

const plugins = [
    {
        plugin: require('./api/server-extensions'),
    },
    {
        plugin: require('./api/authn/plugin'),
        routes: {
            prefix: '/api/v1/auth',
        },
    },
    {
        plugin: require('./api/alba/plugin'),
        routes: {
            prefix: '/api/v1/alba',
        },
    },
    {
        plugin: require('./api/congregtion/plugin'),
        routes: {
            prefix: '/api/v1/congregation',
        },
    },
];

if (process.env.NODE_ENV === 'development') {
    plugins.push({
        plugin: 'good',
        options: {
            ops: {
                interval: 1000,
            },
            reporters: {
                console: [
                    {
                        module: 'good-squeeze',
                        name: 'Squeeze',
                        args: [{ log: '*', response: '*', error: '*' }],
                    },
                    { module: 'good-console' },
                    'stdout',
                ],
            },
        },
    });
}

exports.manifest = {
    server: {
        router: {
            stripTrailingSlash: true,
        },
        routes: {
            cors: true,
            validate: {
                failAction: async (request, h, err) => {
                    if (process.env.NODE_ENV === 'production') {
                        // In prod, log a limited error message and throw the default Bad Request error.
                        console.error('ValidationError:', err.message);
                        throw Boom.badRequest(`Invalid request payload input`);
                    } else {
                        // During development, log and respond with the full error.
                        console.error(err);
                        throw err;
                    }
                },
            },
        },
        debug: !!process.env.DEBUG || false,
        port: +process.env.PORT || 8080,
    },
    register: {
        plugins,
    },
};
