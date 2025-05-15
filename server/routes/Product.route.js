const express = require('express')
const router = express.Router()

// CONTROLLERS AND SCHEMA 
const createProduct = require('../controllers/product.controller')
const productModel = require('../models/product.model')

// MIDDLEWARES 
const isAuthecnticated = require("../middlewares/isAuthenticated")
const upload = require('../middlewares/multer')

// ROUTE HANDLING 
router.post('/create-prodcut', isAuthecnticated,upload.array('image', 8),createProduct.createProducts)
router.get('/details/:id',createProduct.findProductByProdcutId)
router.get('/all-product',createProduct.findAllProduct)


module.exports = router
