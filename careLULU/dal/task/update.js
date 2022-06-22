const Task = require('../models/task')

const update = async ({id, description, is_completed, priority, updated_at}) => {
    try {
        await Task.update(
            {
                description,
                is_completed,
                priority,
                updated_at
            },
            {
                where: { id: id },
            }
        )
        const task = await Task.findOne({where : {id: id}});

        return task.toJSON()
    } catch (err) {
        throw err
    }
}


module.exports = {
    update
}
