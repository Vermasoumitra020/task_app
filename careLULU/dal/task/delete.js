const Task = require('../models/task')

const destroy = async ({id}) => {
    try {
        await Task.destroy(
            {
                where: { id }
            }
        )
    } catch (err) {
        throw err
    }
}


module.exports = {
    destroy
}
