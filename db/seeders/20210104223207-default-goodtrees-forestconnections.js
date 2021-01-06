'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('ForestConnections', [
      {
        climbStatus: true, favStatus: true, userId: 1, treeId: 1,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        climbStatus: false, favStatus: true, userId: 1, treeId: 2,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        climbStatus: true, favStatus: false, userId: 1, treeId: 3,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        climbStatus: false, favStatus: true, userId: 1, treeId: 4,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        climbStatus: true, favStatus: true, userId: 1, treeId: 5,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        climbStatus: true, favStatus: true, userId: 1, treeId: 6,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        climbStatus: true, favStatus: false, userId: 2, treeId: 1,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        climbStatus: false, favStatus: false, userId: 2, treeId: 2,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        climbStatus: false, favStatus: false, userId: 2, treeId: 3,
        createdAt: new Date(), updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('ForestConnections', null, {});
  }
};
