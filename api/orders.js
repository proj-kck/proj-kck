const express = require('express');
const ordersRouter = express.Router();

const {createOrder, getOrderById, orderStatus} = require('../db');

const jwt = require('jsonwebtoken');

ordersRouter.post('/', requireUser, async (req, res, next) => {
    
    const { user_id } = req.body;
    
    try {
        // orderData.user_id = req.order.id;

        // const orders = await createOrder(orderData);

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

ordersRouter.patch()

