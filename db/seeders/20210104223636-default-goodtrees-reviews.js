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
    return queryInterface.bulkInsert('Reviews', [
      {
        reviewText: 'awesome tree, easy climb, pleasant view from top',
        treeId: 1, reviewerId: 1, difficulty: 1, funFactor: 2, viewFromTop: 3,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        reviewText: 'dont climb, feel like i\'ve been haunted now for life, also had to run from ghosts',
        treeId: 2, reviewerId: 2, difficulty: 2, funFactor: 1, viewFromTop: 1,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        reviewText: 'was chased by police after being warned by an employer of city hall',
        treeId: 3, reviewerId: 1, difficulty: 3, funFactor: 4, viewFromTop: 4,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        reviewText: 'climbed it in morning, low hanging branches allow for pleasant climb, great view',
        treeId: 3, reviewerId: 1, difficulty: 2, funFactor: 3, viewFromTop: 4,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        reviewText: 'had a pleasant conversation with Treebeard while I climbed him',
        treeId: 4, reviewerId: 1, difficulty: 2, funFactor: 4, viewFromTop: 4,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        reviewText: 'I climbed for hours and there\'s still so much to explore',
        treeId: 5, reviewerId: 1, difficulty: 1, funFactor: 4, viewFromTop: 2,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        reviewText: 'I\'m glad I survived!',
        treeId: 6, reviewerId: 1, difficulty: 4, funFactor: 2, viewFromTop: 4,
        createdAt: new Date(), updatedAt: new Date()
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
      */
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
