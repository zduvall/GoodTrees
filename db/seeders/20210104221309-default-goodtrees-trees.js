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
     {name: 'GrandOld', cityState:'San Francisco, CA', detLocation: 'right on top of the granderson hill',
     description: 'A hundred year old Oak Tree about 42ft tall with amazing branches for climbing',
     adderId: 1, createdAt: new Date(), updatedAt: new Date()
    },
    {name: 'SleepyHollow', cityState:'St Louis, Missouri', detLocation: 'pass the public graveyard',
     description: 'Creepy, dark, 50 year old haunted tree ',
     adderId: 2, createdAt: new Date(), updatedAt: new Date()
    },
    {name: 'ChuckNorris', cityState:'Seattle, WA', detLocation: '50 yards away from city hall',
     description: 'Right next to police station, risky, but lots of branches',
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
