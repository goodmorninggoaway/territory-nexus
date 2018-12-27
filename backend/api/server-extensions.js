exports.plugin = {
    async register(server, options) {
        server.ext({
            type: 'onPreResponse',
            async method(req, h) {
                const { response } = req;
                if (response.isBoom) {
                    console.error(response.message, response.stack);
                }
                return h.continue;
            },
        });
    },
    name: 'tnx-server-extensions',
    version: '1',
};
