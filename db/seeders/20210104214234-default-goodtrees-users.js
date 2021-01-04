'use strict';
const bcrypt = require('bcryptjs');


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
    const password1 = 'password1';
    const hashedPassword1 = await bcrypt.hash(password1, 10);

    const password2 = 'password2';
    const hashedPassword2 = await bcrypt.hash(password2, 10);

    const password3 = 'password3';
    const hashedPassword3 = await bcrypt.hash(password3, 10);

   return queryInterface.bulkInsert('Users', [
     {username: 'Spongebob', email:'spongebob@gmail.com', hashedPassword: hashedPassword1,
    createdAt: new Date(), updatedAt: new Date()},
     {username: 'Randy', email:'randy@gmail.com', hashedPassword: hashedPassword2,
     createdAt: new Date(), updatedAt: new Date()},
     {username:'Pikachu', email: 'pokemons@protonmail.com', hashedPassword: hashedPassword3,
     createdAt: new Date(), updatedAt: new Date()}
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
