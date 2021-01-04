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
     {climbStatus: true, favStatus: true, userId: 1, treeId: 1,
      createdAt: new Date(), updatedAt: new Date()
    },
    {climbStatus: true, favStatus: false, userId: 2, treeId: 2,
      createdAt: new Date(), updatedAt: new Date()
    }
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
