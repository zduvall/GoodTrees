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
    return queryInterface.bulkInsert('Trees', [
      {
        name: 'GrandOld', cityState: 'San Francisco, CA', detLocation: 'Right on top of the granderson hill.',
        description: 'A hundred year old Oak Tree about 42ft tall with amazing branches for climbing',
        adderId: 1, createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'SleepyHollow', cityState: 'St Louis, MO', detLocation: 'Pass the public graveyard.',
        description: 'Creepy, dark, 50 year old haunted tree ',
        adderId: 2, createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'ChuckNorris', cityState: 'Seattle, WA', detLocation: '50 yards away from city hall.',
        description: 'Right next to police station, risky, but lots of branches',
        adderId: 3, createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Treebeard', cityState: 'Fangorn, OR', detLocation: "On the Pechanga Reservation.",
        description: 'He is an Ent and is said by Gandalf to be "the oldest living thing that still walks beneath the Sun upon this Middle-earth."',
        adderId: 1, createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'The Great Oak', cityState: 'Temecula, CA', detLocation: 'Since he\'s able to move, he\'s not frequently in the same place, but he can\'t move too fast so keep your eyes peeled.',
        description: 'The Great Oak, known as Wi’áaşal by Pechanga people, is recognized as the largest naturally grown indigenous coast live oak (Quercus agrifolia) in the Western United States.',
        adderId: 2, createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Grand Hangover', cityState: 'Grand Canyon Village, AZ', detLocation: 'Hanging over the edge of the tree near Yavapai Point',
        description: 'People only climb this tree hanging over the edge if they\'re drunk...',
        adderId: 3, createdAt: new Date(), updatedAt: new Date()
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
    return queryInterface.bulkDelete('Trees', null, {});
  }
};
