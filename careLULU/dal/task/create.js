const Task = require('../models/task')

const create = async ({UserId, description, priority}) =>{
    const task = await Task.create({
        description,
        priority,
        UserId
    })
    return task.toJSON();
}

module.exports = {
    create
}
