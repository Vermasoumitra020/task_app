const Task = require('./task')
const User = require('./user')

Task.belongsTo(User, {
    onDelete: 'CASCADE'
})
