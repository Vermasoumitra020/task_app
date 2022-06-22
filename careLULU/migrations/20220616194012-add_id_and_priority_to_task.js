'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(
        'Tasks',
        'id',
        {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        }
    );

    await queryInterface.addColumn(
        'Tasks',
        'priority',
        {
          type: Sequelize.ENUM,
          values: ['0', '1', '2'],
          defaultValue: '0'
        }
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
