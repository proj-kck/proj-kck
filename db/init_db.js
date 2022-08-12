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
      DROP TABLE IF EXISTS product_orders;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `)

    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        is_admin BOOLEAN DEFAULT false
      );
    `);

    await client.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        price FLOAT NOT NULL,
        category VARCHAR(255),
        img TEXT,
        quantity INTEGER
      );
    `);

    await client.query(`
        CREATE TABLE orders (
          id SERIAL PRIMARY KEY,
          is_active BOOLEAN DEFAULT true,
          user_id INTEGER REFERENCES users(id)
        );
    `)

    await client.query(`
        CREATE TABLE product_orders (
          id SERIAL PRIMARY KEY,
          product_id INTEGER REFERENCES products(id),
          price_at_purchase FLOAT DEFAULT 0,
          quantity_order INTEGER,
          orders_id INTEGER REFERENCES orders(id)
        );
    `)

  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {

    console.log('Creating products...')

    for (const beer of beers) {
      products.createProduct(beer);
    }

    for (const wine of wines){
      products.createProduct(wine);
    }

    for (const spirit of spirits){
      products.createProduct(spirit);
    }
    
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



  const beers = [
    {name: 'Yuengling',
    description: '12pk Bottles - Light lager beer', 
    price: 12.99,  
    img: 'https://wikiliq.org/wp-content/uploads/2021/02/Yuengling-Traditional-Lager.jpeg'},
    
    {name: 'Stella Artois',
    price: 15.99,
    description: '12pk Pale Lager',
    img: 'https://wikiliq.org/wp-content/uploads/2021/02/Stella-Artois.jpeg'},

    {name: 'Guinness Draught',
    price: 15.99,
    description: '12pk Stout',
    img: 'https://wikiliq.org/wp-content/uploads/2021/02/Guinness-Draught.jpeg'},

    {name: 'Blue Moon Belgian White Wheat Beer',
    price: 15.99,
    description: '12pk Ale',
    img: 'https://wikiliq.org/wp-content/uploads/2021/02/Blue-Moon-Belgian-White-Wheat-Beer.jpeg'},

    {name: 'Heineken Lager',
    price: 15.99,
    description: '12pk Pale Lager',
    img: 'https://wikiliq.org/wp-content/uploads/2021/02/Heineken-Lager.jpeg'},

    {name: 'Lagunitas IPA',
    price: 21.99,
    description: '12pk IPA',
    img: 'https://wikiliq.org/wp-content/uploads/2021/02/Lagunitas-IPA.jpeg'},

    {name: 'New Belgium Fat Tire Amber Ale',
    price: 16.99,
    description: '12pk Ale',
    img: 'https://wikiliq.org/wp-content/uploads/2021/02/New-Belgium-Fat-Tire-Amber-Ale.jpeg'},

    {name: 'New Belgium Voodoo Ranger Imperial IPA',
    price: 21.99,
    description: '12pk IPA',
    img: 'https://wikiliq.org/wp-content/uploads/2021/02/New-Belgium-Voodoo-Ranger-Imperial-IPA.jpeg'},

    {name: 'Sierra Nevada Hazy Little Thing IPA',
    price: 17.99,
    description: '12pk IPA',
    img: 'https://wikiliq.org/wp-content/uploads/2021/02/Sierra-Nevada-Hazy-Little-Thing-IPA.jpeg'},

    {name: 'Founders All Day IPA',
    price: 25.99,
    description: '12pk IPA',
    img: 'https://wikiliq.org/wp-content/uploads/2021/02/Founders-All-Day-IPA.jpeg'},   
]

const wines = [
    {name: "Menage a trois",
    price: 12,
    description: "Merlot, Red",
    img: "https://www.seekpng.com/png/detail/9-99251_california-red-wine-menage-a-trois-wine.png"},

    {name: "Napa Valley Peju",
    price: 70,
    description: "Merlot, Red",
    img: "https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/h20/hf4/8809245671454.png"},
    
    {name: "Castello Poggio",
    price: 20,
    description: "Moscato, White",
    img: "https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/hba/h2d/12291690463262.png"},
    
    {name: "Canoe Ridge “Expedition”",
    price: 28,
    description: "Merlot, Red",
    img: "https://www.winedeals.com/media/catalog/product/cache/f8d2cb12a17084a7445beefcce31e97a/c/a/canoe_ridge_expedition_cab_17mv_750.jpg"},
    
    {name: "Duck Horn",
    price: 95,
    description: "Merlot, Red",
    img: "https://www.duckhornwineshop.com/assets/images/products/pictures/2012-Duckhorn-Napa-Valley-Merlot-750.jpg"},
    
    {name: 'Grace Family “Blank Vineyards”',
    price: 215,
    description: 'Cabernet, Red',
    img: 'https://cdn11.bigcommerce.com/s-i6031ho5me/images/stencil/1000x1000/products/5167/5778/1259557x__84435.1629218045.jpg?c=2'},
    
    {name: 'Alchemist',
    price: 52,
    description: 'Pinot Noir, Red',
    img: 'https://images.vivino.com/thumbs/bQqz1ey4R1-2J8Mfke-xOg_pb_600x600.png'},
    
    {name: 'Underwood',
    price: 30,
    description: 'Pinot Noir, Red',
    img: 'https://cdn.shopify.com/s/files/1/0107/5150/8544/products/underwoodpinot_1800x.png?v=1649045752'},
    
    {name: 'Concha y Toro Frontera',
    price: 119.99,
    description: 'Cabernet Sauvignon, Red',
    img: 'https://www.winedeals.com/media/catalog/product/cache/f8d2cb12a17084a7445beefcce31e97a/f/r/frontera_cab_merlot_16mv_15.png'},
    
    {name: 'Chimney Rock',
    price: 213.99,
    description: 'Cabernet Sauvignon, Red',
    img: 'https://www.uncorked.com/dw/image/v2/BCCB_PRD/on/demandware.static/-/Sites-masterCatalog_terlato/default/dwa624f478/Terlato_com_Product_Images/Chimney_Rock/terlato-cimney-rock-sld-cab-3000x3000.png?sw=800&sh=800&sm=fit'}
]

const spirits = [
    {name: '135 East Hyogo',
    price: 29.99,
    description:'Japanese Dry Gin',
    img: 'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/h5c/hde/13390802944030.png'},

    {name: 'Don Julio 1942 Anejo',
    price: 179.99,
    description: 'Tequila',
    img: 'https://www.donjulio.com/static/images/product-1942.png'},

    {name: 'Casamigos Blanco',
    price: 48.99,
    description: 'Tequila',
    img: 'https://www.totalwine.com/dynamic/x490,sq/media/sys_master/twmmedia/h24/h94/10940880879646.png'},

    {name: 'Sagamore Spirit',
    price: 39.99,
    description: 'Whiskey',
    img: 'https://sagamorespirit.com/wp-content/uploads/SagamoreSpirit-ReserveSeries-AleCaskFinish-web.jpg'},

    {name: 'George Dickel X Leopold Bros',
    price: 109.99,
    description: 'Rye Whiskey',
    img: 'https://www.totalwine.com/dynamic/x490,sq/media/sys_master/twmmedia/hfc/h8c/15408416030750.png'},

    {name: 'Ardbeg An Oa',
    price: 61.99,
    description: 'Scotch Whisky',
    img: 'https://cdn.flaviar.com/cache/default_large/upload/media/default/0001/03/a857935e96b8505bcfd8c8fba0b70045a595f8b2.png'},

    {name: 'The Balvenie ',
    price: 449.99,
    description: 'Tun 1509',
    img: 'https://cdn.flaviar.com/cache/default_large/upload/media/default/0001/04/541c4ce215b58bd746cbbbc29eb1d5fe6ee27482.png'},

    {name: 'Hibiki Suntory Harmony',
    price: 102.99,
    description: 'Japanese Whisky',
    img: 'https://cdn.flaviar.com/cache/default_large/upload/media/default/0001/08/0717545ab11ffbd1f83266beb6be91ff06be560c.png'},

    {name: 'Dalmore Single Malt',
    price: 5999.99,
    description: '35year Scotch',
    img: 'https://image.harrods.com/the-dalmore-30-year-old-2021-edition-highland-single-malt-scotch-whisky-70cl_17520380_36832872_2048.jpg'},
]
