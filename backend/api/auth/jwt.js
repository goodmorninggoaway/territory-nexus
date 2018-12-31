const JWT = require('jsonwebtoken');
const Moment = require('moment');

exports.signToken = async ({ id, ...requestedClaims }) => {
    const claims = {
        aud: null,
        ...requestedClaims,
        iss: 'Territory Nexus',
        iat: new Moment().unix(),
        exp: new Moment().add(process.env.TOKEN_TTL_SECONDS || 3600, 'seconds').unix(),
        sub: requestedClaims.id,
    };
    const token = await JWT.sign(claims, process.env.TOKEN_SECRET);

    return { claims, token };
};
