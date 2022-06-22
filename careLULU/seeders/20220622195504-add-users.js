'use strict';
const bcrypt = require('bcrypt')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        first_name: 'Austin',
        last_name: 'Tenny',
        username: 'Austin66',
        email: 'tenny.austin@example.com',
        password: await bcrypt.hash('admin', 12),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        first_name: 'Norman',
        last_name: 'Loxley',
        username: 'Norman23',
        email: 'loxley.norman@example.com',
        password: await bcrypt.hash('admin', 12),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {})
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
