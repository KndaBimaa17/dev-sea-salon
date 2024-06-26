'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Branches', [{
      name: 'Main Branch',
      location: '123 Main St',
      openingTime: '09:00',
      closingTime: '21:00',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Branches', null, {});
  }
};
