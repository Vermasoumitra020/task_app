const jwt = require('jsonwebtoken')
const User = require('../dal/user')
const logger = require('../config/logger')


const authContextMiddleware = async (req, res, next) => {
    const { authorization } = req.headers
    // If auth header not present set user to null
    if(!authorization) {
        logger.info("Header with authorization key is not present")
        req.user = null
        return next()
    }

    // If auth header is present but the token is not in correct format
    const token = authorization.split(' ')[1]
    if(!token) {
        logger.info("Header with proper format is not present, should be authorization: Bearer {Token}")
        req.user = null
        return next()
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.NODE_SECRET || 'He1CZ<^^eZ*TL(<');
    } catch (err) {
        logger.info("Error om decoding token")
        req.user = null
        return next()
    }
    if(!decodedToken) {
        req.user = null
        return next()
    }

    const user = await User.findById(decodedToken.userId)
    req.user = user.toJSON()
    return next()
}

module.exports = {
    authContextMiddleware
}
