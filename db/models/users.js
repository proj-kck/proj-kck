// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require('bcrypt');



async function createUser({username, password, email, isAdmin = false}) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const { rows: [user] } = await client.query(`
<<<<<<< HEAD
    INSERT INTO users (username, password, email, "isAdmin")
    VALUES($1, $2, $3, $4)
    ON CONFLICT DO NOTHING
    RETURNING *;
=======
      INSERT INTO users (username, password, email, is_admin)
      VALUES($1, $2, $3, $4)
      ON CONFLICT DO NOTHING
      RETURNING username, email, is_admin;
>>>>>>> 3a639da07eac9cb9d6a60425aed9ab74a52b8ed8
    `, [username, hashedPassword, email, isAdmin]);
    
    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  /* this adapter should fetch a list of users from your db */
  try {
    const { rows } = await client.query(`
    SELECT id, username, email, "isAdmin"
    FROM users;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}
async function getUserById(userId) {
  try {
    const {rows: [user] } = await client.query(`
    SELECT id, username, email, "isAdmin"
    FROM users
    WHERE id=${userId}
    `);
    if (!user) {
      throw {
        name: "UserNotFoundError",
        message: "A user with that id does not exist"
      }
    }
    user.products = await getProductsByUser(userId);
    
    return user;
  } catch (error) {
    throw error;
  }
} 
async function updateUser(id, fields = {}) {
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');
    if (setString.length === 0) {
      return;
    }
    try {
      const { rows: [ user ]} = await client.query(`
      UPDATE users
      SET ${ setString }
      WHERE id=${ id }
      RETURNING *;
      `, Object.values(fields));
      return user;
    } catch (error) {
      throw error;
    }
  }
  
module.exports = {
  client,
  getAllUsers,  
  createUser,
  getUserById,
  updateUser,
};