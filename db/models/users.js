// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require('bcrypt');

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser
};

async function createUser({username, password, email}) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const { rows: [user] } = await client.query(`
      INSERT INTO users (username, password, email)
      VALUES($1, $2, $3)
      ON CONFLICT DO NOTHING
      RETURNING *;
    `, [username, hashedPassword, email]);

    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  /* this adapter should fetch a list of users from your db */
}
