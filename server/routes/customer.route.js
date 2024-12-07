const express = require("express")
const router = express.Router()

// AUTHENTICATION MIDDLEWARE 
const isCustomerAuthenticated = require("../middlewares/customer.authontication")
const customerController = require('../controllers/customer.controller')
const upload = require("../middlewares/multer")

router.post('/register',customerController.registerCustomer)
router.post('/login',customerController.customerLogin)
router.get('/loggedinCustomer',isCustomerAuthenticated,customerController.sendDataOfLoggedInCustomer)
router.post('/likeProduct', isCustomerAuthenticated,customerController.likeControlller)
router.post('/add-to-cart',isCustomerAuthenticated,customerController.addtoCartFunction)
router.get('/get-liked-prodcut', isCustomerAuthenticated,customerController.sendLikedProdcut)
router.get('/get-cart-prodcut', isCustomerAuthenticated,customerController.snedCartProduct)
router.post('/deleveryLocation-updtae', isCustomerAuthenticated, upload.single("avatar"), customerController.handleAddressUpdate)

module.exports = router