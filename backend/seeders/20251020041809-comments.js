/** @type {import('sequelize-cli').Migration} */
export default {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('comments', [
      {
        author: "Alice",
        message: "This article was super helpful, thanks!",
      },
      {
        author: "Bob",
        message: "I think there's a small mistake in the second paragraph.",
      },
      {
        author: "Charlie",
        message: "Can you explain more about the database part?",
      },
      {
        author: "Diana",
        message: "Great write-up! I learned a lot.",
      },
      {
        author: "Ethan",
        message: "I tried this approach and it worked perfectly!",
      },
    ], {});
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('comments', null, {});
  },
};
