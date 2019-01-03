const Glue = require('glue');
const chai = require('chai');
const HttpStatusCodes = require('http-status-codes');
const manifest = require('../manifest');
const pick = require('lodash').pick;
const addCongregation = require('../domain/congregation').addCongregation;
const reset = require('../../backend/domain/mongo').reset;

const { expect } = chai;
chai.use(require('dirty-chai'));
chai.use(require('sinon-chai'));

describe('Congregation APIs', () => {
    let server;

    beforeEach(async () => {
        server = await Glue.compose(manifest.manifest, { relativeTo: __dirname });
    });

    afterEach(async () => {
        await reset();
    });

    describe('POST /congregations', () => {
        it('should create a congregation', async () => {
            const input = require('./__fixtures/create-congregation');
            const response = await server.inject({
                method: 'POST',
                url: '/api/v1/congregations',
                payload: input,
            });

            expect(response.statusCode).to.equal(HttpStatusCodes.CREATED);

            const actual = JSON.parse(response.payload);
            expect(actual).to.have.property('_id');
            expect(actual).to.deep.include({
                name: input.name,
                language: input.language,
                users: [
                    {
                        name: input.admin.name,
                        email: input.admin.email,
                    },
                ],
            });
        });
    });

    describe('PUT /congregations/{congregationId}', () => {
        it('should edit a congregation', async () => {
            const createdCongregation = await addCongregation({
                congregation: pick(require('./__fixtures/create-congregation'), 'name', 'language', 'alternateLanguages'),
            });

            const input = require('./__fixtures/edit-congregation');
            const response = await server.inject({
                method: 'PUT',
                url: `/api/v1/congregations/${createdCongregation._id}`,
                payload: input,
            });

            expect(response.statusCode).to.equal(HttpStatusCodes.OK);

            const actual = JSON.parse(response.payload);
            expect(actual).to.deep.include({
                _id: createdCongregation._id,
                name: input.name,
                language: input.language,
                alternateLanguages: input.alternateLanguages,
            });
        });
    });

    describe('DELETE /congregations/{congregationId}', () => {
        it('should delete a congregation', async () => {
            const createdCongregation = await addCongregation({
                congregation: pick(require('./__fixtures/create-congregation'), 'name', 'language', 'alternateLanguages'),
            });

            const response = await server.inject({
                method: 'DELETE',
                url: `/api/v1/congregations/${createdCongregation._id}`,
            });

            expect(response.statusCode).to.equal(HttpStatusCodes.OK);
        });
    });

    describe('GET /congregations', () => {
        it('should fetch a congregation', async () => {
            const createdCongregation = await addCongregation({
                congregation: pick(require('./__fixtures/create-congregation'), 'name', 'language', 'alternateLanguages'),
            });

            const response = await server.inject({
                method: 'GET',
                url: `/api/v1/congregations`,
            });

            expect(response.statusCode).to.equal(HttpStatusCodes.OK);
            const actual = JSON.parse(response.payload);

            expect(actual).to.have.length(1);
        });
    });
});
