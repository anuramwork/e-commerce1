const express = require('express');
const { register, login, viewproducts, addCart, fetchCartById, createOrder, viewOrder } = require('../controllers/userControl');

const userRouter = express.Router();

userRouter.post("/register",register)
userRouter.post("/login", login)
userRouter.get('/getProducts',viewproducts)
userRouter.post('/addcart',addCart)
userRouter.get('/viewcartbyid',fetchCartById)
userRouter.post('/addorder',createOrder)
userRouter.get('/vieworders',viewOrder)

module.exports = userRouter;