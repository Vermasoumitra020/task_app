const sequelize = require('./database')
const logger = require('./logger')

const User = require('../dal/models/user')
const Task = require('../dal/models/task')

require('../dal/models/associations')

sequelize.sync({force:false}).then((result) =>{
    logger.info(`Successful connection => ${result}`)
}).catch((error) =>{
    logger.info(`Error creating connection => ${error}`)
})
