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

module.exports = router;