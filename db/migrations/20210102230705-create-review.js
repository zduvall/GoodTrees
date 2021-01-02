'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reviewText: {
        type: Sequelize.TEXT
      },
      treeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Trees' }
      },
      reviewerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users' }
      },
      difficulty: {
        allowNull: false,
        type: Sequelize.INTEGER,
        is: /[1-4]/
      },
      funFactor: {
        allowNull: false,
        type: Sequelize.INTEGER,
        is: /[1-4]/
      },
      viewFromTop: {
        allowNull: false,
        type: Sequelize.INTEGER,
        is: /[1-4]/
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
    return queryInterface.dropTable('Reviews');
  }
};