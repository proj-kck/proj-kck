const express = require('express');
const ordersRouter = express.Router();

const {createOrder, closeOrder, orderStatus, getOrderStatus } = require('../db/models/orders')

const jwt = require('jsonwebtoken');

ordersRouter.post('/:user_id', async (req, res, next) => {
    const { user_id } = req.params;
    try {
        //require user to be logged in
        const order = await createOrder(user_id);

        if (order) {
            res.send(order);
        } else {
            next({
                title: 'OrderCreationError',
                message: 'There was an error creating your order. Please try again.'
            })
        }
    } catch (error) {
        next(error);
    }
});
ordersRouter.patch('/:orderId', async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const order = await closeOrder(orderId);
        res.send (
            order
        );
    } catch (error) {
        next (error);
    }
});

ordersRouter.get('/:orderId', async(req, res, next) => {
    try {
        const { orderId } = req.params;
        const orderStatus = await getOrderStatus(orderId);
        res.send(
            orderStatus
        );
    } catch (error) {
       next (error);
    }
})


module.exports = ordersRouter;

