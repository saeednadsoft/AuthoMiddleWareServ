var jwt = require('express-jwt');
var jwtAuthz = require('express-jwt-authz');

const checkPermissions = jwtAuthz(["read:messages"],{
    // api permissions will save in Permissions property in the access token
    customScopeKey: "permissions"
})

module.exports = checkPermissions