require('dotenv').config();
const Glue = require('glue');
const manifest = require('./manifest');

(async function () {
    try {
        const server = await Glue.compose(manifest.manifest, { relativeTo: __dirname });
        await server.start();
        console.log('server started');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
