'use strict';

const faker = require('faker');

let numTrees;

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

    // create filler trees
    const fillerTrees = [];
    const numFillerTrees = 30; // edit this to edit the number of trees created
    numTrees = numFillerTrees + 13; // this is adding 13 because we have 13 hardcoded trees

    const treeTypes = [
      'Arborvitae',
      'Black Ash',
      'White Ash',
      'Bigtooth Aspen',
      'Quaking Aspen',
      'Basswood',
      'American Beech',
      'Black Birch',
      'Gray Birch',
      'Paper Birch',
      'Yellow Birch',
      'Butternut',
      'Black Cherry',
      'Pin Cherry',
      'American Chestnut',
      'Eastern Cottonwood',
      'Cucumber Tree',
      'American Elm',
      'Slippery Elm',
      'Balsam Fir',
      'Hawthorn',
      'Eastern Hemlock',
      'Bitternut Hickory',
      'Pignut Hickory',
      'Shagbark Hickory',
      'American Hophornbeam',
      'American Hornbeam',
      'American Larch',
      'Black Locust',
      'Honey - Locust',
      'The Maples',
      'Red Maple',
      'Silver Maple',
      'Sugar Maple',
      'The Oaks',
      'Black Oak',
      'Chestnut Oak',
      'Northern Red Oak',
      'Scarlet Oak',
      'White Oak',
      'Eastern White Pine',
      'Pitch Pine',
      'Red Pine',
      'Eastern Redcedar',
      'Sassafras',
      'Shadbush',
      'Red Spruce',
      'White Spruce',
      'Sycamore',
      'Tulip Tree',
      'Black Walnut',
      'Black Willow',
    ]
    const treeAdjs = [
      'Ancestral',
      'Ancient',
      'Beloved',
      'Brown',
      'Conspicuous',
      'Dark',
      'Darkest',
      'Eldest',
      'Gnarled',
      'Golden',
      'Green',
      'Huge',
      'Light',
      'Local',
      'Lonely',
      'Mature',
      'Perfect',
      'Potted',
      'Rare',
      'Serpentine',
      'Stately',
      'Tallest',
      'Young',
    ]
    
    for (let i = 0; i < numFillerTrees; i++) {
      
      const randTreeType = treeTypes[Math.floor(Math.random() * treeTypes.length)];
      const randTreeAdj = treeAdjs[Math.floor(Math.random() * treeAdjs.length)];
      const randTreeOwner = faker.name.firstName() + "'s"
      const randPrefix = faker.name.prefix()

      const nameBuildNum = Math.random() * 10

      const name = 'replace';
      
      const cityState = 'replace';
      const detLocation = 'replace';
      const description = 'replace';
      const adderId = 'replace';

      fillerTrees.push({
        name: name,
        cityState: cityState,
        detLocation: detLocation,
        description: description,
        adderId: adderId,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    };

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
        name: 'Treebeard', cityState: 'Fangorn, OR', detLocation: 'On the Pechanga Reservation.',
        description: 'He is an Ent and is said by Gandalf to be "the oldest living thing that still walks beneath the Sun upon this Middle-earth."',
        adderId: 4, createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'The Great Oak', cityState: 'Temecula, CA', detLocation: 'Since he\'s able to move, he\'s not frequently in the same place, but he can\'t move too fast so keep your eyes peeled.',
        description: 'The Great Oak, known as Wi’áaşal by Pechanga people, is recognized as the largest naturally grown indigenous coast live oak (Quercus agrifolia) in the Western United States.',
        adderId: 1, createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Grand Hangover', cityState: 'Grand Canyon Village, AZ', detLocation: 'Hanging over the edge of the tree near Yavapai Point',
        description: 'People only climb this tree hanging over the edge if they\'re drunk...',
        adderId: 2, createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Cedar Point', cityState: 'Cedar City, UT', detLocation: 'On the property of the Frontier Homestead State Park Museum',
        description: 'Tall and sturdy, the climb is well shaded. Have fun!',
        adderId: 3, createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Palm Tree Power', cityState: 'Laie, HI', detLocation: 'On the north side of the Polynesian Cultural Center near the intersection of Napela Dr and Naniloa Loop',
        description: '250 feeet tall, no branches, good luck!',
        adderId: 4, createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Piney Pine Tree', cityState: 'Colorado Springs, CO', detLocation: 'East of Cheyenne Mountain Zoo, take Cheyenne Mountain HWY as far as you can and look north.',
        description: 'We discovered this during our last trip to Colorado and hope you enjoy the climb.',
        adderId: 1, createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Whomping Willow', cityState: 'Brick Township, NJ', detLocation: 'As far north east as you can go in Mantoloking Bridge County Park',
        description: 'Looks like it\'s straight out of Harry Potter',
        adderId: 2, createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Sycamore Sam', cityState: 'Lewiston, ME', detLocation: 'You\ll find it at about 67 Jean St',
        description: 'I don\'t think you can find a better tree to climb in the world.',
        adderId: 3, createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Grandmother Willow', cityState: 'Saint Paul, MN', detLocation: 'On the northern tip of Pigs Eye Lake',
        description: 'You\'ll feel like you\'re talking to Grandmother Willow from Pocahontas when climbing this weeping willow',
        adderId: 4, createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: 'Bill\'s Bonsai', cityState: 'New York, MN', detLocation: 'Overlooking Times Square in Bill\'s apartment',
        description: 'Amazing view, but no real climb :P',
        adderId: 1, createdAt: new Date(), updatedAt: new Date()
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
