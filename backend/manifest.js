const Boom = require('boom');

const plugins = [
    {
        plugin: require('./api/server-extensions'),
    },
    {
        plugin: require('./api/auth/plugin'),
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
    { plugin: require('inert') },
    { plugin: require('vision') },
    {
        plugin: require('hapi-swaggered'),
        options: {
            tags: {
                'api': 'Example foobar description',
            },
            info: {
                title: 'Territory Nexus API',
                description: 'Powered by node, mongo, hapi, joi, hapi-swaggered, hapi-swaggered-ui and swagger-ui',
                version: '1.0',
            },
        },
    },
    //{
    //    plugin: require('hapi-swaggered-ui'),
    //    options: {
    //        title: 'Territory Nexus API',
    //        path: '/docs',
    //        //authorization: {
    //        //    field: 'apiKey',
    //        //    scope: 'query', // header works as well
    //        //    // valuePrefix: 'bearer '// prefix incase
    //        //    defaultValue: 'demoKey',
    //        //    placeholder: 'Enter your apiKey here',
    //        //},
    //        swaggerOptions: {
    //            validatorUrl: null,
    //        },
    //    },
    //},
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
