const dbConfig = require("../configs/dbConfig.js");
const { hash } = require("bcryptjs");

(async function main() {
  // seeding code
})()
  .then(async () => await dbConfig.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await dbConfig.$disconnect();
  });
