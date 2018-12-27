const Glue = require('glue');
const chai = require('chai');
const dirtyChai = require('dirty-chai');
const HttpStatusCodes = require('http-status-codes');
const manifest = require('../manifest');
const reset = require('../../backend/domain/mongo').reset;
const { expect } = chai;
chai.use(dirtyChai);

describe('Congregation Routes', () => {
    let server;

    beforeEach(async () => {
        server = await Glue.compose(manifest.manifest, { relativeTo: __dirname });
    });

    afterEach(async () => {
        await reset();
    });

    describe('POST /congregation', () => {
        it('should return create a record', async () => {
            const input = require('./__fixtures/congregation');
            const response = await server.inject({
                method: 'POST',
                url: '/api/v1/congregation',
                payload: input,
            });

            expect(response.statusCode).to.equal(HttpStatusCodes.CREATED);
            expect(JSON.parse(response.payload)).to.deep.include(input);
            expect(JSON.parse(response.payload)).to.have.property('_id');
        });
    });
});
