const express = require('express');
const guestRouter = express.Router();

guestRouter.post('/', async (req, res, next) => {
    const { cart } = req.session;
    if (!cart) {
        req.session.cart = {};
        res.send(cart)
    } else {
        res.send(cart)
    }
})

guestRouter.get("/items", (req, res, next) => {
    const { cart } = req.session;
    if (!cart) {
        res.send("No items to display")
    } else {
        res.send(cart)
    }
})

guestRouter.post('/end', async (req, res, next) => {
    try {
        req.session.destroy();
        res.sendStatus(200);
    } catch (error) {
        next(error)
    }
})

guestRouter.post("/items", (req, res, next) => {
    const { product_id, name, price_at_purchase } = req.body; 
    console.log('This is item: ', product_id, name)
    const cartItem = { product_id, name, price_at_purchase, quantity: 1 };
    const { cart } = req.session
    if (cart) {
        const { items } = cart;
        let doesExist = false;
        for (const item of items){
            if (item.product_id === cartItem.product_id){
                item.quantity += 1;
                res.send(200);
                return;
            }
        }
        items.push(cartItem)
    } else {
        req.session.cart = {
            items: [cartItem]
        }
    };

    res.send(200); 
})

guestRouter.delete('/items', async (req, res, next) => {
    try {
        const { product_id } = req.body;
        const { items } = req.session.cart;
        for (let i = 0; i < items.length; i++) {
            if (items[i].product_id === product_id) {
                if (items[i].quantity > 1) {
                    items[i].quantity -= 1;
                } else {
                    items.delete()
                }
            }
        }
        res.send(items[0]);
    } catch (error) {
        next(error)
    }
})

module.exports = guestRouter;