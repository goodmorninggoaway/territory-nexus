const plugins = [
    {
        plugin: require('inert'),
    },
    {
        plugin: require('./api/alba/routes'),
        routes: {
            prefix: '/api/v1/alba',
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
            isCaseSensitive: false,
        },
        routes: {
            security: {
                hsts: false,
                xss: true,
                noOpen: true,
                noSniff: true,
                xframe: false,
            },
            cors: true,
            jsonp: 'callback',
        },
        debug: !!process.env.DEBUG || false,
        port: +process.env.PORT || 1338,
    },
    register: {
        plugins,
    },
};
