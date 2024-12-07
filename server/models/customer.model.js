const mongoose  = require("mongoose")

const customerModel = new mongoose.Schema({
  fullName  : {
    type : String,
    required : true
  },
  emailAddress : {
    type : String,
    required : true
  },
  number : {
    type : Number,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  
  state : {
    type : String,
  },
  city : {
    type : String,
  },
  landmark : {
    type : String,
  },
  houseNumber : {
    type : Number,
  },
  profilePicture : {
    type : String,
    default : "http://localhost:3000/uploads/default-profle-pic.jpg"
  },
  likedProdcut : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : "productModel"
    }
  ],
  cartItem : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : "productModel"
    }
  ],
  yourOrders : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : "productModel"
    }
  ]
})

module.exports = mongoose.model("customerModel",customerModel)