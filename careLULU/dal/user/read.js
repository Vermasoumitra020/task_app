const User = require('../models/user')

const findById = id => User.findByPk(id)

const findByUsername = username => User.findOne({where:{username:username}})

module.exports = {
    findById,
    findByUsername,
}
