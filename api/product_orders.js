const express = require ('express');
const productOrdersRouter = express.Router();

const {addProductToOrder, getAllProductsOnOrder, updateProductOrders } = require('../db/models/product_orders');

const jwt = require('jsonwebtoken');

productOrdersRouter.post('/add', async (req, res, next) => {
    try {
        
        const {orders_id, product_id, price_at_purchase, quantity_order} = req.body;
        const addProduct = await addProductToOrder(orders_id, product_id, price_at_purchase, quantity_order)
        res.send(addProduct);
    } catch (error) {
        next (error);
    }
})
productOrdersRouter.get('/:orders_id', async (req, res, next) => {
    try {
        const {orders_id} = req.params;
        
        const products = await getAllProductsOnOrder(orders_id);
        res.send(products);
    } catch (error) {
        next (error);
    }
})
// productOrdersRouter.patch('/:orders_id', async (req, res, next) => {
//     try {
//         const {orders_id} = req.params;
//         const { product_id, price_at_purchase, quantity_order} = req.body;
//     } catch (error) {
        
//     }
// })

module.exports=productOrdersRouter

// req.body 
