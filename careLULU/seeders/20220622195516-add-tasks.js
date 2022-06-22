'use strict';


const createTasks = () =>{
  const priority = ["0","1","2"];
  const tasks = []
  for(let i=0; i<20; i++){
    if(i < 10){
      tasks.push({
        UserId: 1,
        description: `This is the test task ${i+1}`,
        priority: priority[Math.floor(Math.random() * priority.length)],
        is_completed: false,
        created_at: new Date(),
        updated_at: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    else{
      tasks.push({
        UserId: 2,
        description: `This is the test task ${i+1}`,
        priority: priority[Math.floor(Math.random() * priority.length)],
        is_completed: false,
        created_at: new Date(),
        updated_at: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
  }
  return tasks
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tasks', createTasks(), {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
