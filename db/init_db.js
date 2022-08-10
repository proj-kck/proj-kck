const {
  client,
  users,
  products
} = require('./');

async function buildTables() {
  try {
    client.connect();

    console.log('Building tables...');

    await client.query(`
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
        price VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        img TEXT
      );
    `);
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {

    console.log('Creating products...')
    await products.createProduct({
      name: 'Yuengling',
      description: '12pk Bottles - Light lager beer', 
      price: '12.99', 
      category: 'beer', 
      img:'https://images.heb.com/is/image/HEBGrocery/005666012?fit=constrain,1&wid=800&hei=800&fmt=jpg&qlt=85,0&resMode=sharp2&op_usm=1.75,0.3,2,0'
    })
    
    console.log('Creating users...')
    const user = await users.createUser({
      username: 'kck', 
      password: 'testtest', 
      email: 'test@gmail.com'
    });
    
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
