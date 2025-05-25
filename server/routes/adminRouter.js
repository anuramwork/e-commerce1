const express = require('express');
const multer = require('multer');
const path = require('path');

// multer for file handling
const storage=multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const uploads=multer({storage})


const { viewUser, deleteUser, addProduct, viewProduct, deleteProduct, viewproductbyid, updateProductbyId } = require('../controllers/adminControl');

const adminRouter = express.Router();

adminRouter.get("/viewusers",viewUser)
adminRouter.delete("/deleteuser", deleteUser)

adminRouter.post("/addproducts",uploads.single('Image'),addProduct)
adminRouter.get("/viewproducts",viewProduct)
adminRouter.delete("/deleteproduct/:productId",deleteProduct)
adminRouter.get("/viewProductById",viewproductbyid)
adminRouter.put("/updateproduct/:id",uploads.single('Image'),updateProductbyId)



module.exports = adminRouter