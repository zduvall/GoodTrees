'use strict';

const db = require('../models/index')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    // create filler forest connections (FC's)
    const fillerFCs = [];
    const maxFillerFCsPerUser = 20; // edit this to edit the max # FC's per user
    const numUsers = await db.User.count();
    const numTrees = await db.Tree.count();

    for (let userId = 3; userId <= numUsers; userId++) {
      
      let numFillerFCs = Math.floor(Math.random() * maxFillerFCsPerUser)
      for (let i = 0; i < numFillerFCs; i++) {
        
        const climbStatus = Math.round(Math.random()) === 0 ? true : false;
        const favStatus = Math.round(Math.random()) === 0 ? true : false;
        
        let treeId = null;
        let set = new Set();
        while (true) {
          let randTreeId = Math.ceil(Math.random() * numTrees);
          if (!set.has(randTreeId)) {
            set.add(randTreeId)
            treeId = randTreeId;
            break
          }
        }

        fillerFCs.push({
          climbStatus: climbStatus,
          favStatus: favStatus,
          userId: userId,
          treeId: treeId,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }
    }

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
      ...fillerFCs
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
