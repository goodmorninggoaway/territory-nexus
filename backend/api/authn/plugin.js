exports.plugin = {
    version: '1',
    name: 'tnx-authentication',
    dependencies: {},
    async register(server, options) {
        server.auth.strategy('google', 'bell', {
            provider: 'google',
            password: 'cookie_encryption_password_secure',
            isSecure: false,
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
                handler: function (request, h) {

                    if (!request.auth.isAuthenticated) {
                        return 'Authentication failed due to: ' + request.auth.error.message;
                    }

                    return '<pre>' + JSON.stringify(request.auth.credentials, null, 4) + '</pre>';
                },
            },
        });
    },
};
