const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { model } = require('mongoose')

// IMPORTING CUSTOMER MODEL 
const customerModel = require('../models/customer.model')
const productModel = require('../models/product.model')
// FUNCTION FOR REGITER CUSTOMER 
const registerCustomer = async(req,res)=> {
  const {fullName, emailAddress, number,password} = req.body
  // IF CREDENTIALS ARE MISSING 
  if(!fullName || !emailAddress || !number || !password) {
   return res.json({
     sucess : false,
      messeg : "Credentials are missing!"
    })
  }
  // CHECHING WEATHER CUTOMER ALREDAY EXIST OR NOT 
  const isCustomerExist = await customerModel.findOne({emailAddress : emailAddress})
  if(isCustomerExist) {
    return res.json({
      messege : "Please use diffrent email id! User already exist!",
      sucess : false,
    })
  }
  // IF EVERYTING HAS COME  
 try {
  bcrypt.genSalt(15,(err,salt)=> {
    bcrypt.hash(password, salt,async(err,hashedPassword)=> {
      const createdCustomer = await customerModel.create({
        fullName,
        emailAddress,
        number ,
        password : hashedPassword
      })
      if(createdCustomer) {
        res.json({
          sucess : true,
          messege : "Customer regsitered successful!",
          customer : await customerModel.findOne({emailAddress : createdCustomer.emailAddress}).select('-password')
        })
      }
    })
  })
 } catch (error) {
  console.log(error)
  res.json({
    sucess : false,
    messege : "Internal server error!",
    error
  })
 }
}



// FUNCTION FOR CUSTOMER LOGIN 
const customerLogin = async(req,res)=> {
  const {emailAddress,password} = req.body
  // IF CREDENTIALS ARE MISSING 
  if(!emailAddress || !password) {
    return res.json({
      sucess : false,
      messeg : "Credentials are missing!"
    })
  }
  // IF EVERTING HAS COME
  const customerForLogin = await customerModel.findOne({emailAddress})
 try {
  if(!customerForLogin) {
    return res.json({
      sucess : false,
      messege: "User not found!"
    })
  }
   // IF USER EXIST 
   bcrypt.compare(password, customerForLogin.password,async(err,result)=> {
    if(!result) {
      return res.json({
        sucess : false,
        messege : "Password is wrong!"
      })
    } 
    else {
      // MAKING COOKIE FOR LOGGED IN CUSTOMER 
      const customerToken = jwt.sign({emailAddress}, process.env.JWT_SECREAT_CUSTOMER)
      res.cookie('customerToken', customerToken) 
      // SENDING RESPONSE 
      res.json({
        sucess : true,
        messege : "logged in succesfull!",
        customer : await customerModel.findOne({emailAddress}).select('-password')
      })
      
    }
   })
 } catch (error) {
  console.log(error)
  res.json({
    sucess : false,
    messege : "Internal server error!",
    error
  })
 }
}








// FUNCTION FOR HDANLDE ADD PRODCUT INTO USER'S LIKED CART  
const likeControlller = async(req,res)=> {
  const loggedInUser = req.loggedInUser
  const prodcutId = req.body.itemId
  const isItemExist = await productModel.findOne({_id : prodcutId})
 try {
  // checking user exist or not 
  if(!isItemExist) {
    res.json({
      sucess : false,
      messeg : "Product not exist!",
      status : 400
    })
  }
  else {
   const realCustomer = await customerModel.findOne({emailAddress : loggedInUser.emailAddress})
   realCustomer.likedProdcut.forEach((item)=> {
     console.log(item._id)
    })
    const isProductAlreadyPresent = realCustomer.likedProdcut.some((item)=> (item._id).toString() === prodcutId)
    //  if prodcut is already presesnt into user's liked array 
  if(isProductAlreadyPresent) {
    realCustomer.likedProdcut = realCustomer.likedProdcut.filter(
      (item) => item.toString() !== prodcutId
    );
    
    await realCustomer.save()
   return res.json({
    sucess : true,
    messege : "Product removed sucessfully form your liked items",
    data : await customerModel.findOne({emailAddress : realCustomer.emailAddress}).select('-password').populate('likedProdcut')
  })
  }

  // if first time user trying to add prodcut into their like array 
  realCustomer.likedProdcut.push(prodcutId)
    await realCustomer.save()
    res.json({
      sucess : true,
      messege : "Product added sucessfully into your liked items",
      data : await customerModel.findOne({emailAddress : realCustomer.emailAddress}).select('-password').populate('likedProdcut')
    })
  }
 } catch (error) {
  console.log(error)
  res.json({
    sucess : false,
    messege : "Internal server error!",
  })
 }
}






// FUNCTION FOR ADDING PRODCUT INTO CUSTOMER'S CART ARRAY 
const addtoCartFunction = async(req,res)=> {
  const user = req.loggedInUser
  const productId = req.body.itemId
  // CHECHING PRODCUT EXIST OR NOT 
  const isProductExist = await customerModel.findOne({_id : productId})
  // SENDING RESPONSE IF PRODCUT NOT EXIST 
  if(!isProductExist) {
    return res.json({
      sucess : false,
      messege : "Prodcut not exist!",
    })
  }
     // IF PRODCUT EXIST SO CHECHING FOR WEATHER THAT PRODCUT IS ALREADY INTO CART ARRY OR NOT  
     const isProductAlreadyPresent = user.cartItem.some((item)=> item === (isProductExist._id).toString())
     if(!isProductAlreadyPresent) {
      return res.json({
        sucess : true,
        messege : "Prodcut succesfully removed from your cart!",
      })
     }
     else {
      return res.json({
        sucess : true,
        messege : "Prodcut succesfully added into your cart!"
      })
     }
}


// FUNCTION FOR SENDING LIKED PRODCUT OF LOGGEDIN IN CUSTOMER 
const sendLikedProdcut = (req,res)=> {
  const customer = req.loggedInUser
 return res.json({
    sucess : true,
    messeg : "All your liked prodcut!",
    products : customer.likedProdcut
  })
}


module.exports = {
  registerCustomer,
  customerLogin,
  likeControlller,
  addtoCartFunction,
  sendLikedProdcut
}