const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    productName:{type:String},
    productPrice:{type:Number},
    productQuantity:{type:Number},
    productDescription:{type:String},
    image:{type:String}
},{timestamps:true})

const Product=mongoose.model('product_tbl',productSchema)

module.exports=Product