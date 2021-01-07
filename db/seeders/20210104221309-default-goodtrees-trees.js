'use strict';

const faker = require('faker');
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

    // create filler trees
    const fillerTrees = [];
    const numFillerTrees = 50; // edit this to edit the number of trees created
    const numUsers = await db.User.count();

    // data for creating random trees
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
      'Baum',
      'Cucumber Tree',
      'American Elm',
      'Slippery Elm',
      'Balsam Fir',
      'Hawthorn',
      'Eastern Hemlock',
      'Bitternut Hickory',
      'Pignut Hickory',
      'Shagbark Hickory',
      'Árbol',
      'American Hornbeam',
      'American Larch',
      'Black Locust',
      'Honey Locust',
      'Maple',
      'Red Maple',
      'Silver Maple',
      'Sugar Maple',
      'Oak',
      'Black Oak',
      'Chestnut Oak',
      'Northern Oak',
      'Scarlet Oak',
      'White Oak',
      'White Pine',
      'Pitch Pine',
      'Red Pine',
      'Redcedar',
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
      'Cool',
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
    const treeDesciptions1 = [
      'This is one of the best trees out there.',
      'My friend and I felt so lucky when we stumbled upon this tree, I\'m glad we get to share it with the world.',
      'I hope lots of people enjoy climbing this beauty just like I did.',
      'It\'s easy to locate and quickly recognize.',
      'I\'m excited to share this tree with all of you. It\'s beautiful to see and climb.',
      'This tree is kind of hard to find, but it\'s worth the effort getting there.',
      'I grew up minutes from this tree and climbed it every day as a child.',
      'This is a historic tree for the location. Please climb with care.',
      'There are so many trees out there, but few are as worthy of this one to be climbed.',
      'This tree is a small but beautiful tree.',
      'I grew up climbing this tree and was later proposed to under it.',
    ]
    const treeDesciptions2 = [
      'Please leave a review!',
      'Hope you have a nice time climbing.',
      'Happy climbing!',
      'Be careful on the way up!',
      'Not for the faint of heart!',
      'Great tree for kids!',
      'Awesome for kids!',
      'Have fun!',
      'Enjoy!',
      'Be safe!',
      'Please review :)',
      'Enjoy your climb :)',
      'Take care :)',
      'For all tree climbing enthusiasts :)',
      'Great for all ages :)',
      'Adults only.',
      'Experienced climbers only.',
      'Peace, bro :P',
      'I hope you enjoy it too!',
    ]

    for (let i = 0; i < numFillerTrees; i++) {

      // create random name
      const randTreeAdj = treeAdjs[Math.floor(Math.random() * treeAdjs.length)];
      const randTreeOwner = faker.name.firstName() + "'s"
      const randPrefix = faker.name.prefix()
      const randTreeType = treeTypes[Math.floor(Math.random() * treeTypes.length)];

      let name;
      const nameBuildNum = Math.random() * 10
      if (nameBuildNum <= 5) {
        name = `${randTreeAdj} ${randTreeType}`
      } else if (nameBuildNum <= 8) {
        name = `${randTreeOwner} ${randTreeType}`
      } else {
        name = `${randPrefix} ${randTreeType}`
      }
      // make sure name is not more than 30 per our database restrictions
      name = name.substring(0, 30)

      // generate random cityState
      let city = faker.address.city()
      while (city.length > 36) {
        city = faker.address.city()
      }
      const cityState = `${city}, ${faker.address.stateAbbr()}`;

      // generate random detLocation
      const detLocation = faker.address.streetAddress();

      // generate random description by combinging random descriptions from the 2 lists.
      const description = `${treeDesciptions1[Math.floor(Math.random() * treeDesciptions1.length)]} ${treeDesciptions2[Math.floor(Math.random() * treeDesciptions2.length)]}`;

      // generate random adder
      const adderId = Math.ceil(Math.random() * numUsers);

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
      ...fillerTrees
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
