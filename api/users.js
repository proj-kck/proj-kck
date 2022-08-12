const express = require('express');
const usersRouter = express.Router();

const { createUser, getAllUsers, getUserByUsername, getUser } = require('../db/users');

const jwt = require('jsonwebtoken');
usersRouter.get('/', async (req, res, next) =>  {
    try {
        const users = await getAllUsers();
        res.send({
            users
        });
    } catch ({ name, message }) {
        next({ name, message});
    }
});

usersRouter.post('/login', async (req, res, next) => {

    const { username, password } = req.body;

    if (!username || !password) {
      next({
        name: "MissingCredentialsError",
        message: "Please provide a username and password"
      });
    }
    try {
      const user = await getUser({username, password})
    if (user) {
        const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '1w'}); 
        res.send({ 
          message: "you are logged in",
          token, 
          user});
      } else {
        next({ 
          name: 'IncorrectCredentialsError', 
          message: 'Username or password is incorrect'
        });
      }
    } catch(error) {
      next(error);
    }
});

usersRouter.post('/register', async (req, res, next) => {

    const { username, password, email, is_admin } = req.body;
  
    try {
      const _user = await getUserByUsername(username);
    
    if (_user) {
        next({
          name: 'UserExistsError',
          message: 'A user by that username already exists'
        });
      }
    const user = await createUser({
        username,
        password,
        email,
        is_admin,
      });
    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1w' });
    res.send({ 
        message: "You are now registered.",
        token,
        user: user 
      });
    } catch ({ name, message }) {
      next({ name, message });
    } 
}); 
module.exports = usersRouter;
