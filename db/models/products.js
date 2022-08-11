// grab our db client connection to use with our adapters
const client = require('../client');

module.exports = {
  // add your database adapter fns here
  getAllProducts,
  createProduct
};

async function createProduct({name, description, price, category, img}) {
    try {
        const { rows: [product] } = await client.query(`
            INSERT INTO products(name, description, price, category, img)
            VALUES($1, $2, $3, $4, $5)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
        `, [name, description, price, category, img]);

        return product;
    } catch (error) {
        throw error;
    }
}

async function getAllProducts() {
  /* this adapter should fetch a list of users from your db */
}
