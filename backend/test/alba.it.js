const Glue = require('glue');
const chai = require('chai');
const dirtyChai = require('dirty-chai');
const manifest = require('../manifest');

const { expect } = chai;
chai.use(dirtyChai);

describe('Alba Routes', () => {
    let server;

    beforeEach(async () => {
        server = await Glue.compose(manifest.manifest, { relativeTo: __dirname });
    });

    describe('POST /foreign/location-import/csv', () => {
        it('should return 200', async () => {
            const response = await server.inject({
                method: 'POST',
                url: '/api/v1/alba/foreign/location-import/csv',
                payload: { payload: require('./__fixtures/alba-export-csv') },
            });

            expect(response.statusCode).to.equal(200);
            expect(response.payload).to.equal('true');
        });
    });
});
