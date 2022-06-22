const userResolver = require('./userResolver')
const taskResolver = require('./taskResolver')

module.exports = {
    ...userResolver,
    ...taskResolver
}
