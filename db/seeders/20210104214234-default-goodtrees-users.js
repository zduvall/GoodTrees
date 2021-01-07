'use strict';

const bcrypt = require('bcryptjs');
const faker = require('faker');

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

    // create filler users
    const fillerUsers = [];
    const numFillerUsers = 30; // edit this to edit the number of users created

    for (let i = 0; i < numFillerUsers; i++) {

      let userName = faker.internet.userName()
      while (userName.length > 20) {
        userName = faker.internet.userName()
      }

      const email = faker.internet.email();
      const hashedPassword = await bcrypt.hash(userName + "234", 10);

      fillerUsers.push({
        username: userName,
        email: email,
        hashedPassword: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    };

    // hard coded users
    const passwordDemo = 'demo';
    const hashedPasswordDemo = await bcrypt.hash(passwordDemo, 10);

    const password1 = 'password1';
    const hashedPassword1 = await bcrypt.hash(password1, 10);

    const password2 = 'password2';
    const hashedPassword2 = await bcrypt.hash(password2, 10);

    const password3 = 'password3';
    const hashedPassword3 = await bcrypt.hash(password3, 10);

    return queryInterface.bulkInsert('Users', [
      { username: 'DemoClimber', email: 'demo@demo.com', hashedPassword: hashedPasswordDemo, createdAt: new Date(), updatedAt: new Date() },
      { username: 'NewbClimber', email: 'new-climber@gmail.com', hashedPassword: hashedPassword2, createdAt: new Date(), updatedAt: new Date() },
      { username: 'Spongebob', email: 'spongebob@gmail.com', hashedPassword: hashedPassword1, createdAt: new Date(), updatedAt: new Date() },
      { username: 'Pikachu', email: 'pokemons@protonmail.com', hashedPassword: hashedPassword3, createdAt: new Date(), updatedAt: new Date() },
      ...fillerUsers
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
