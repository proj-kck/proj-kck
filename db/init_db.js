const {
  client,
  users,
  products
} = require('./');

const beers = require('./seedData');

async function buildTables() {
  try {
    client.connect();

    console.log('Building tables...');

    await client.query(`
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS products;
    `)

    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        "isAdmin" BOOLEAN DEFAULT false
      );
    `);

    await client.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        price FLOAT NOT NULL,
        category VARCHAR(255),
        img TEXT
      );
    `);

    // await client.query(`
    //     CREATE TABLE orders (
    //       id SERIAL PRIMARY KEY,
    //       "userId" INTEGER REFERENCES users(id) NOT NULL,
    //       address TEXT NOT NULL,
    //       amount FLOAT NOT NULL
    //     );
    // `)
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {

    console.log('Creating products...')
    for (const beer of beers) {
      products.createProduct(beer)
    }
    
    console.log('Creating users...')
    const user = await users.createUser({
      username: 'kck', 
      password: 'testtest', 
      email: 'test@gmail.com'
    });

    const product = await products.getProductById(4)
    console.log(product)
    
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
