const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

const isAuthenticated = (req,res,next)=> {
    console.log(req.cookies)
    const token = req.cookies?.token
    console.log(token)
   try {
    if(!token) {
        return res.json({
             sucess : false,
             status : 401,
             messege : "User is not authenticated!"
         })
     }
     else {
         jwt.verify(token, process.env.JWT_SECREAT,async(err,decode)=> {
            const user = await userModel.findOne({emailAddress : decode.emailAddress}).select('-password').populate('porducts')
            req.user = user
         //    console.log('user for login ',req.user)
            next()
         })
 
     }
   } catch (error) {
    res.json({
        sucess : false,
        messege : "Internla server error!",
        error
    })
   }
}

module.exports = isAuthenticated