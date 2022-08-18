const express = require('express');
const ordersRouter = express.Router();

const {createOrder, closeOrder, orderStatus } = require('../db/models/orders')

const jwt = require('jsonwebtoken');

ordersRouter.post('/:user_id', async (req, res, next) => {
    const { user_id } = req.params;
    try {

        const order = await createOrder(user_id);

        if (order) {
            res.send(order);
        } else {
            next({
                status: 'OrderCreationError',
                message: 'There was an error creating your order. Please try again.'
            })
        }
    } catch ({status, message}) {
        next({status, message});
    }
});

ordersRouter.delete('/:orderId', async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const order = await closeOrder(orderId);
        res.send ({
            order
        });
    } catch (error) {
        next (error);
    }
});


module.exports = ordersRouter;

