'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Trees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(30),
        unique: true
      },
      cityState: {
        allowNull: false,
        type: Sequelize.STRING(40)
      },
      detLocation: {
        allowNull: false,
        type: Sequelize.TEXT,
        unique: true
      },
      coordinates: {
        type: Sequelize.GEOGRAPHY,
        unique: true
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      adderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users' }
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
    return queryInterface.dropTable('Trees');
  }
};