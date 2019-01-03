const Glue = require('glue');
const chai = require('chai');
const HttpStatusCodes = require('http-status-codes');
const manifest = require('../manifest');
const pick = require('lodash').pick;
const addCongregation = require('../domain/congregation').addCongregation;
const reset = require('../domain/mongo').reset;
const getDatabase = require('../domain/mongo');
const signToken = require('../api/auth/jwt').signToken;

const { expect } = chai;
chai.use(require('dirty-chai'));
chai.use(require('sinon-chai'));

describe('Congregation APIs', () => {
    let server;
    let token;
    let congregation;

    const createCongregation = async () => {
        const db = await getDatabase();

        const { ops } = await db.collection('congregation').insertOne({
            name: 'Test Congregation',
            language: 'English',
            _id: 'test-congregation-1',
        }, {
            w: 'majority',
        });

        return ops[0];
    };
    beforeEach(async () => {
        server = await Glue.compose(manifest.manifest, { relativeTo: __dirname });
        token = await signToken({ id: 'test-user@territorynexus.com', aud: 'urn:congregation:test-congregation-1' });
        congregation = await createCongregation();
    });

    afterEach(async () => {
        await reset();
    });

    describe('GET /congregations', () => {
        it('should fetch the congregation based on the aud claim in session token', async () => {
            const response = await server.inject({
                method: 'GET',
                url: `/api/v1/congregation`,
                headers: {
                    Authorization: token.token,
                },
            });

            expect(response.statusCode).to.equal(HttpStatusCodes.OK);
            const actual = JSON.parse(response.payload);

            expect(actual).to.deep.equal(congregation);
        });
    });
});
