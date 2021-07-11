var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

// also will attach the payload to req.user obj
const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-tndjgd-8.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://lastexpressapi.net',
  issuer: 'https://dev-tndjgd-8.us.auth0.com/',
  algorithms: ['RS256']
})
//.unless({path:['/']});



module.exports = jwtCheck