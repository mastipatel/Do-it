const jwt = require('express-oauth2-jwt-bearer');

const jwtCheck = jwt.auth({
  audience: 'https://www.doit-api.com',
  issuerBaseURL: 'https://dev-x0s78kkozg060m6y.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

module.exports = jwtCheck;
