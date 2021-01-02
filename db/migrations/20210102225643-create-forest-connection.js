'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ForestConnections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      climbStatus: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      favStatus: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Users'}
      },
      treeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Trees' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ForestConnections');
  }
};