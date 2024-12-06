const express = require('express')
const router = express.Router()

// MIDDLEWARE 
const isAuthenticated = require('../middlewares/isAuthenticated.js')

// USER CONTROLLERS 
const userController = require('../controllers/user.controller.js')


router.post('/registration',userController.register)
router.post('/login',userController.login)
router.post('/edit',isAuthenticated, userController.editUser)
router.get('/userAuthetication', isAuthenticated, userController.loggedInVandor)

module.exports = router  
