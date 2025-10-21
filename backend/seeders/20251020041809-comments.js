/** @type {import('sequelize-cli').Migration} */
export default {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('comments', [
      {
        "author": "Charlie",
        "message": "Great write-up! I learned a lot about patterns in JavaScript.",
      },
      {
        "author": "Matthew",
        "message": "I wish more tutorials explained TypeScript generics this clearly.",
      },
      {
        "author": "Ethan",
        "message": "Really enjoyed the section on performance optimization with React hooks!",
      },
      {
        "author": "Jacob",
        "message": "This helped me understand why immutability is so important in Redux.",
      },
      {
        "author": "Olivia",
        "message": "Excellent article on Node.js streams - it finally clicked for me!",
      },
      {
        "author": "Thomas",
        "message": "Nice overview of how to structure scalable Express apps. Very practical.",
      },
      {
        "author": "Bob",
        "message": "Appreciated the examples comparing promises and observables.",
      },
      {
        "author": "Chris",
        "message": "This article convinced me to finally start using ESLint and Prettier in all my projects.",
      },
      {
        "author": "Alice",
        "message": "Your explanation of closures was so clear. I will be sharing this with my team.",
      },
      {
        "author": "Peter",
        "message": "Loved the deep dive into WebSockets. The diagrams made it super easy to follow!",
      }
    ], {});
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('comments', null, {});
  },
};
