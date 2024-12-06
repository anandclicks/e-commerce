const mongoose = require('mongoose')
const { array } = require('../middlewares/multer')

const productModel = new mongoose.Schema({
    title  : {
        type : String,
        require : true,
        minLengt : 3
    },
    dipscription : {
        type : String,
        require : true,
        minLengt : 5,
        require : true
    },
    price : {
        type : String,
        require : true
    },
    salePrice : {
        type : String,
        require : true
    },
    quantity : {
        type : String,
        required : true
    },
    bestSeller : {
        type : String
    },
    returenPolicy : {
        type : String
    },
    deleveryCharge : {
        type : Number
    },
   color : {
    type : String
   },
    Images : [
        {
            type : String,
        }
    ],
    seller : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'userModel'
    }
})

module.exports = mongoose.model("productModel", productModel)