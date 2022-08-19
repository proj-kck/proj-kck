const express = require('express');
const ordersRouter = express.Router();

const {createOrder, closeOrder, getOrderStatus, getOpenOrder } = require('../db/models/orders')

const jwt = require('jsonwebtoken');

ordersRouter.post('/', async (req, res, next) => {
    try {
        let order = await getOpenOrder(req.user.id);
        if (!order){
            order = await createOrder(req.user.id)
        }

        // if (!req.user.order) {
        //     order = await createOrder(req.user.user_id);
        //     req.user.order = order;
        // } else {
        //     res.send(req.user.order)
        // }

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

