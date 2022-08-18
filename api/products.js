const express = require('express');
const router = express.Router();
const { products } = require('../db');

router.get('/', async (req, res, next) => {
    try {
        const allProducts = await products.getAllProducts();
        res.send(allProducts);
    } catch (error) {
        throw error;
    }
})
router.get('/beer', async (req, res, next) => {
    try {
        const products_category = await products.getAllProductsByCategory('beer');
        res.send(products_category);
    } catch (error) {
        throw error;
    }
})
router.get('/wine', async (req, res, next) => {
    try {
        const products_category = await products.getAllProductsByCategory('wine');
        res.send(products_category);
    } catch (error) {
        throw error;
    }
})
router.get('/spirits', async (req, res, next) => {
    try {
        const products_category = await products.getAllProductsByCategory('spirit');
        res.send(products_category);
    } catch (error) {
        throw error;
    }
})
router.get('/:productId', async (req, res, next) => {
    try {
        const { productId } = req.params;
        const product = await products.getProductById(productId);
        res.send(product);
    } catch (error) {
        throw error;
    }
})
//Admin delete
// router.delete('./:category', async (req, res, next) => {
//     try {
//         const {productId} = req.params;
//         const 
//     } catch (error) {
        
//     }
// })

module.exports = router;