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

router.get('/:productId', async (req, res, next) => {
    try {
        const { productId } = req.params;
        const product = await products.getProductById(productId);
        res.send(product);
    } catch (error) {
        throw error;
    }
})
module.exports = router;