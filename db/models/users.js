// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require('bcrypt');

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser,
  getUserById
};

async function createUser({username, password, email, isAdmin = false}) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const { rows: [user] } = await client.query(`
      INSERT INTO users (username, password, email, is_admin)
      VALUES($1, $2, $3, $4)
      ON CONFLICT DO NOTHING
      RETURNING username, email, is_admin;
    `, [username, hashedPassword, email, isAdmin]);

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const { rows: [user] } = await client.query(`
      SELECT id, username, email, is_admin
      FROM users
      WHERE id=$1;
    `, [userId])
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  /* this adapter should fetch a list of users from your db */
}
