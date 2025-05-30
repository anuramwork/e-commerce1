const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{type:String, required: true},
    email:{type:String},
    password:{type:String}
},{timestamps:true})

const User=mongoose.model("user_tbl",userSchema)
module.exports=User