const Task = require('../models/task')


const findByUserId = userId => Task.findAll({where:{UserId: userId}})

const getFilteredTasks = ({query, sort, order, limit, from}) => {
    return Task.findAndCountAll({
        where: query,
        order: [
            [sort || 'created_at', order && order.toUpperCase() || 'DESC']
        ],
        limit: limit || 10,
        offset: (from || 0)*(limit || 10),
    })
}


module.exports = {
    findByUserId,
    getFilteredTasks
}
