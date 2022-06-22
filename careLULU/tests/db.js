const {faker} = require('@faker-js/faker')
const User = require('../dal/user')
// const Task = require('../dal/task')
const bcrypt = require("bcrypt");

const generateUser = async (data) =>{
    const defaults = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        password: (data && data.password) || faker.internet.password(),
    }

    defaults.password = await bcrypt.hash(defaults.password, 12)
    const user= (await User.create(defaults)).toJSON()
    return user
}

const generateTasks = async ( taskData={}) =>{
    const task = {
        UserId: taskData.userId,
        description: faker.name.findName(),
        is_completed: (taskData && taskData.is_completed) || faker.datatype.boolean(),
        priority: faker.random.arrayElement(['0', '1', '2'])
    }
    // return await Task.create(task)
}


module.exports = {
    generateUser,
    generateTasks
}
