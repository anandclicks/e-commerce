const mongoose = require("mongoose");
const userModel = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  counrtyOrigin : {
    type : String,
    required : true
  },
  emailAddress: {
    type: String,
    minLength: 4,
    required: true,
  },
  shopeName : {
    type : String,
    required : true
  },
  password: {
    type: String,
    required: true,
  },
  verified : {
    type : String,
  },
  businessNumber: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
  },
  porducts : [
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : "productModel"
    }
  ],
  Allorders : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : "productModel"
  }
  ],
  profilePicture: {
    type: String,
    default: `${process.env.DOMAIN_NAME}uploads/default-profle-pic.jpg`,
  },
});


module.exports = mongoose.model('userModel', userModel)