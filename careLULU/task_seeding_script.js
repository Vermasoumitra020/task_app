const bcrypt = require('bcrypt')

const createTasks = () =>{
    const priority = ["0","1","2"];
    const tasks = []
    for(let i=0; i<20; i++){
        if(i < 10){
            tasks.push({
                UserId: 1,
                description: `This is the test task ${i+1}`,
                priority: priority[Math.floor(Math.random() * priority.length)],
                is_completed: false
            })
        }
        else{
            tasks.push({
                UserId: 2,
                description: `This is the test task ${i+1}`,
                priority: priority[Math.floor(Math.random() * priority.length)],
                is_completed: false
            })
        }
    }
    return tasks
}

export default {
    up: async (queryInterface) => queryInterface.bulkInsert('Task', createTasks(), {}),
}
