const User = require('../models/userModel')
const jwt = require("jsonwebtoken")
const Product = require('../models/productModel')
const Cart = require('../models/cartModel')
//Register API
const register = async (req, res)=>{
  try{
    const {username, email, password} = req.body;
    
    const user = new User({username, email, password})
    await user.save();
    res.json({message: "user registered successfully from backend", status: 200, user})
  }catch(err){
    console.log(err);
    res.json({message: "error registering user from backend", err})
  }
}

//LOGIN API
const login = async (req, res)=>{
  try{
    const {email, password } = req.body;
    const user = await User.findOne({email: email})
    if(!user){
       console.log("no user found")
       return res.json({message: "user not found from backend.Check your email", status: 404})
       
    }
    if(password != user.password){
      console.log("Invalid password")
      res.json({message: "invalid password from backend", status: 500})
    }else{
      console.log("login successful")
      const token=jwt.sign({id:user._id, name: user.username},"jwtsecretkey123",{expiresIn:"1h"})
      res.json({message: "Login successful from backend", status: 200,token});

    }

  }catch(err){
    console.log("error from backend",err)
    res.json(err)
  }
}


const viewproducts=async(req,res)=>{
   try{
         const products=await Product.find()
         res.json({message: "products fetched from backend successfully", products})
   }catch(err){
       console.log(err)
    }
}


//cart controllers

const addCart=async(req,res)=>{
   const userId=req.headers.userid
   const {productId,Quantity}=req.body
   
   try{
     const cart=await Cart.findOne({userId:userId})
     if(cart){
       const productIndex=cart.product.findIndex(p=>
         p.productId==productId
       )

       if(productIndex > -1){
         cart.product[productIndex].quantity+=Quantity || 1
       }else{
         cart.product.push({productId,quantity:Quantity})
       }
       await cart.save()
     }else{
      const cart=await Cart({
         userId,
         product:[{
            productId,
            quantity:Quantity || 1
         }]
      })
      await cart.save()
     }
     res.json({message: "Product Added to cart successfully", cart})
   }catch(err){
      console.log(err)
   }
}


const fetchCartById=async(req,res)=>{
   try{
    const userId=req.headers.id;
    const cartItems=await Cart.findOne({userId}).populate('product.productId')
    res.json(cartItems)
   }catch(err){
      console.log(err)
   }
}





module.exports = {register, login, viewproducts, addCart , fetchCartById}