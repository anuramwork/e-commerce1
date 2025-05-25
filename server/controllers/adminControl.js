const express = require('express');
const User = require('../models/userModel');
const Product = require('../models/productModel')


// controllers for User table

// view all users
const viewUser = async (req, res)=>{
    try{
        const users =await User.find()
        console.log(users)
        res.json({message: "Succesfully fetched users from backend", users})

    }catch(err){
        console.log(err);
        res.json(err)
    }
}

// delete user based on user id
const deleteUser = async (req, res)=>{
    try{
        const id = req.headers.userid
        console.log(id);
        await User.findByIdAndDelete({_id: id})
        res.json("User deleted successfully")

    }catch(err){
        console.log(err);
        res.json({message: "Error deleting user from backend",err});
        console.log("error deleting user", err )
    }
}


//controllers for product table

const addProduct = async (req, res)=>{
    try{
        const {productName,productDescription,productPrice,productQuantity}=req.body
        const image = req.file.filename
        const product=await Product({
            productName,
            productDescription,
            productPrice,
            productQuantity,
            image
          })
          await product.save() ;
          res.json({message: "Product added successfully from backend", status: 200})

    }catch(err){
        console.log("Error adding product", err)
        res.json({message: "Error creating product from backend", err})
    }
}

const viewProduct = async (req, res)=>{
    try{
        const products =await Product.find()
        res.json({message: "Products successfully fetched from backend",products })

    }catch(err){
        console.log("error viewing products", err)
        res.json({message: "Error in fetching products in backend",err})
    }
}


const deleteProduct = async (req, res)=>{
    try{
        const id = req.params.productId
        console.log(id);
        await Product.findByIdAndDelete({_id: id})
        res.json({message: "User deleted successfully"})

    }catch(err){
        console.log(err);
        res.json({message: "Error deleting user from backend",err});
        console.log("error deleting user", err )
    }
}

const viewproductbyid = async(req, res)=>{
    try{
        const id = req.headers.id
        const product =await Product.findById(id)
        // console.log(product);
        res.json(product)
        
    }catch(err){
        console.log(err)
    }
}


const updateProductbyId = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      productName,
      productDescription,
      productPrice,
      productQuantity,
    } = req.body;

    let updateData = {
      productName,
      productDescription,
      productPrice,
      productQuantity,
    };

    if (req.file && req.file.filename) {
      updateData.image = req.file.filename;
    }

    const product = await Product.findByIdAndUpdate(id, updateData, {new: true,});

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



module.exports = {viewUser,deleteUser , addProduct, viewProduct, deleteProduct, viewproductbyid, updateProductbyId}