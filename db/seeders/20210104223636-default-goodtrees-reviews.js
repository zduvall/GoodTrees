'use strict';

const db = require(`../models/index`)

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

    // create filler reviews
    const fillerReviews = [];
    const maxFillerReviewsPerTree = 6; // edit this to edit the max # reviews per tree
    const numUsers = await db.User.count();
    const numTrees = await db.Tree.count();

    // data for creating random trees
    const reviewTexts = [
      'What an amazing climb!',
      'Can\'t wait to climb it again!',
      'Get here before the tree falls down! It\'s crazy old!',
      'Only for the toughest climbers.',
      'Glad I climbed this tree!',
      'My grandma climbed this tree. You can too!',
      'This tree will give you all the adventure you\'ve ever wanted.',
      'My spouse and I decided to spend the night in this tree becuase it was so comfortable.',
      'You can\'t beat the view at the top of this tree',
      'I\'ll be back for sure.',
      'I am so glad we stopped here to climb this tree.',
      'This is a great tree to level-up your climbing skills',
      'I barely made it to the top of the tree, but it was worth it.',
      'It took me 7 attempts to climb this tree to the top.',
      'I had to give up before I made it to the top, I\'ll be back again to try.',
      'I climbed this tree during the night and fell and broke my arm :/',
      'Somewhat trikkier climb than I thought it would be.',
      'Can\'t wait to climb this tree again',
      'This is the worst tree I have ever climbed.',
      'Stay away from this tree. Not fun at all.',
      'The climb was okay, but the view was great.',
      'I would not really recommend this tree.',
      'Make sure to come prepared',
      'You may want a rope for this one',
      'Go ahead and take a chance on this tree',
      'If you are in the area I would recommend stopping by!',
      'There is an old man who lives nearby who yelled at us for climbing',
      'Yeeeeeeaaaaaah!',
      'Watch out for the wasp nest near the top',
      'Love this tree. I have been back at least 10 times.',
      'I climb this tree every time I\'m in the area.',
    ]

    for (let treeId = 1; treeId <= numTrees; treeId++) {
      let numFillerReviews = Math.ceil(Math.random() * maxFillerReviewsPerTree)
      for (let i = 0; i < numFillerReviews; i++) {

        const randReview = reviewTexts[Math.floor(Math.random() * reviewTexts.length)]
        const reviewerId = Math.ceil(Math.random() * numUsers)
        const difficulty = Math.ceil(Math.random() * 4)
        const funFactor = Math.ceil(Math.random() * 4)
        const viewFromTop = Math.ceil(Math.random() * 4)

        fillerReviews.push({
          reviewText: randReview,
          treeId: treeId,
          reviewerId: reviewerId,
          difficulty: difficulty,
          funFactor: funFactor,
          viewFromTop: viewFromTop,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }

    }

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
      ...fillerReviews
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
