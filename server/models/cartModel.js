const mongoose=require('mongoose')
const cartSchema= new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,
        ref:'user_tbl'
    },
    product:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'product_tbl'
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ],
    status:{
        type:String,
        default:"cart"
    }
},{timestamps:true})

const Cart = mongoose.model("cart_tbl",cartSchema)
module.exports = Cart;