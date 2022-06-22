const Task = require('../../dal/task')
const {paginator} = require("../../helpers/paginator");
const {isNullOrUndefined} = require("../../helpers/utils");
const logger = require('../../config/logger')


const createTask = async (args, req) => {
    if(!req || !req.user) {
        logger.info(`user is unauthorized ${JSON.stringify(args)}`)
        throw new Error("Unauthorized")
    }
    try {
        logger.info(`create task with data => ${JSON.stringify(args)}`)
        const task = await Task.create({ ...args.taskData, UserId: req.user.id } )
        return task
    } catch (err) {
        throw err
    }
}

const listTasks = async (args, req) => {
    if(!req || !req.user) {
        logger.info(`user is unauthorized ${JSON.stringify(args)}`)
        throw new Error("Unauthorized")
    }

    try {
        const { sort, order, is_completed, priority, limit, from } = args.taskData
        const query = Object.assign({},
            {UserId: req.user.id},
            !isNullOrUndefined(is_completed) && {is_completed: is_completed},
            priority ? {priority: priority} : null,
        )
        logger.info(`creating task with task => ${JSON.stringify(args.taskData)}  with filters =>${JSON.stringify(query)}`)
        const {count, rows} = await Task.getFilteredTasks({query, sort, order, limit, from})
        return paginator({count, rows, limit, from})
    } catch (err) {
        throw err
    }
}

const updateTask = async (args, req) => {
    if(!req || !req.user) {
        throw new Error("Unauthorized")
    }

    try {
        logger.info(`updating task with task => ${JSON.stringify(args.taskData)} `)
        return await Task.update( {...args.taskData, updated_at: new Date()} )
    } catch (err) {
        throw err
    }
}

const deleteTask = async (args, req) => {
    if(!req || !req.user) {
        throw new Error("Unauthorized")
    }

    try {
        return await Task.destroy( args )
    } catch (err) {
        throw err
    }
}

module.exports = {
    createTask,
    listTasks,
    updateTask,
    deleteTask
}
