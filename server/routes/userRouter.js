const express = require('express');
const { register, login, viewproducts, addCart, fetchCartById } = require('../controllers/userControl');

const userRouter = express.Router();

userRouter.post("/register",register)
userRouter.post("/login", login)
userRouter.get('/getProducts',viewproducts)
userRouter.post('/addcart',addCart)
userRouter.get('/viewcartbyid',fetchCartById)


module.exports = userRouter;