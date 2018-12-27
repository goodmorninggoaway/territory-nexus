const JWT = require('jsonwebtoken');
const Moment = require('moment');
const TTL = process.env.TOKEN_TTL_SECONDS || 3600;

exports.signToken = async ({ id, ...claims }) => {
    return await JWT.sign({
        ...claims,
        iss: 'Territory Nexus',
        iat: new Moment().unix(),
        exp: new Moment().add(TTL, 'seconds').unix(),
        sub: claims.id,
    }, process.env.TOKEN_SECRET);
};
