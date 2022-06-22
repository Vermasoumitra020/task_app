const Sequelize = require('sequelize')
const sequelize = require('../../config/database')

const Task = sequelize.define('Task', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue:Sequelize.NOW,
        allowNull: false,
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue:Sequelize.NOW,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    is_completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    priority: {
        type: Sequelize.ENUM,
        values: ['0', '1', '2'],
        defaultValue: '0'
    }
})

module.exports = Task
