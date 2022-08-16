const express = require ('express');
const productOrdersRouter = express.Router();

const {product_id, price_at_purchase, quantity_order, orders_id } = require('../db/models/product_orders');

const jwt = require('jsonwebtoken');

productOrdersRouter.get('/:productId', async (req, res, next) => {
    try {
        const {productId} = req.params;
        const productById = await product_id(productId);
        res.send(productById);
    } catch (error) {
        next (error);
    }
})

productOrdersRouter.get()

productOrdersRouter.get()

productOrdersRouter.get()

// req.body 
