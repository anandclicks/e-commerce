const productModel = require("../models/product.model");
const userModel = require('../models/user.model')

// PRODUCT CREATION 
const createProducts = async(req,res)=> {
    const {title,dipscription,price,salePrice,quantity,bestSeller,returenPolicy,deleveryCharge,color} = req.body
    const {files} = req
    const Allimages = [
        `http://localhost:3000/uploads/${files[0].filename}`,
        `http://localhost:3000/uploads/${files[1].filename}`,
        `http://localhost:3000/uploads/${files[2].filename}`,
        `http://localhost:3000/uploads/${files[3].filename}`,
        `http://localhost:3000/uploads/${files[4].filename}`
    ]
    try {
        const product = await productModel.create({
            title,
            dipscription,
            price,
            salePrice,
            quantity,
            bestSeller,
            returenPolicy,
            deleveryCharge,
            color ,
        })
        Allimages.forEach(async(item)=> {
            product.Images.push(item)
        })
        await product.save()
        if(product) {
            const vandor = await userModel.findOne({emailAddress : req.user.emailAddress})
            // saving product id in vandor's id 
            vandor.porducts.push(product._id)
            await vandor.save()
            // saving vandor's id in prodcut 
            product.seller = vandor._id
            await product.save()
            res.json({
                sucess : true,
                messege : "Product is live!",
                product
            })
        }
    } catch (error) {
        console.log(error)
        return res.json({
            sucess : false,
            messege : "Internal server error!",
            error : error
        })
    }
}

// PRODUCT FIND BY ID 
const findProductByProdcutId = async(req,res)=> {
    const id = req.params.id
    const product = await productModel.findOne({_id : id}).populate('seller')
    if(product) {
        res.json({
            sucess : true,
            product
        })
    }
    else {
        res.json({
            sucess : false,
            messege : "Product not found!"
        })
    }
}

// ALL PRODUCT 
const findAllProduct = async(req,res)=> {
    const allProdct = await productModel.find()
    if(allProdct) {
        res.json({
            sucess : true,
            allProdcuts : allProdct
        })
    }
}
module.exports = {
    createProducts,
    findProductByProdcutId,
    findAllProduct
}