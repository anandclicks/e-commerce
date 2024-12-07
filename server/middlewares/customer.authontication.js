const jwt = require('jsonwebtoken')
const customerModel = require('../models/customer.model')

const isCustomerAuthenticated = async(req,res,next)=> {
  const token = req.cookies?.customerToken
  // console.log(req.cookies)
 try {
  if(!token) {
    return res.json({
      sucess : false,
      messege : "You need to login!",
      status : 401
    })
  }
    const decodeValue = jwt.verify(token, process.env.JWT_SECREAT_CUSTOMER)
    const customer = await customerModel.findOne({emailAddress : decodeValue.emailAddress}).select('-password')
    req.loggedInUser = customer
       next()

 } catch (error) {
  console.log(error)
  res.json({
    sucess : false,
    messege : "Internal server error",
    error
  })
 }
}

module.exports = isCustomerAuthenticated