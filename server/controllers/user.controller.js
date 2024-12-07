  const express = require("express");
  const router = express.Router();
  const jwt = require("jsonwebtoken");
  const bcrypt = require("bcrypt");

  // MODELS
  const userModel = require("../models/user.model.js");

  // USER REGISTRATION FUNCTION
  const userRegistration = async (req, res) => {2   
    const { name, emailAddress,counrtyOrigin,shopeName, password, businessNumber } = req.body;
    try {
      // IF USER FROM SAME EMAIL ID ALREADY EXIST 
      const userForRegistration = await userModel.findOne({ emailAddress });
      if (userForRegistration) {
        return res.json({
          sucess: false,
          messege: "Registration failed! User already exist!",
          status: 401,
        });
      }   
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hashedPasswrd) => {
          const registeredUser = await userModel.create({
            name: name,
            emailAddress: emailAddress,
            businessNumber: businessNumber,
            password: hashedPasswrd,
            counrtyOrigin : counrtyOrigin,
            shopeName : shopeName
          });
          if (registeredUser) {
            return res.json({
              sucess: true,
              messege: "User has been created!",
              user: await userModel.findOne({emailAddress : emailAddress}).select('-password'),
              status: 201,
            });
          }
        });
      });
    } catch (error) {
      res.json({
        sucess: false,
        messege: "Internal server error! user couldn't registered",
        error: error,
        status: 404,
      });
    }
  };

  // USER LOGIN FUNCTION
  const userLogin = async(req, res) => {
    const { emailAddress, password } = req.body;
    try {
      // IF USER NOT EXIST 
      const isUserExistOrNot = await userModel.findOne({emailAddress})
      if(!isUserExistOrNot) {
          return res.json({
              sucess : false,
              messege : "User not exist!",
              status : 401
          })
      }

      // IF USER EXIST 
      bcrypt.compare(password, isUserExistOrNot.password,async(err,result)=> {
          if(result) {
              // MAKE A COOKE AND SEND 
              const cookie =  jwt.sign({emailAddress}, process.env.JWT_SECREAT)
              res.cookie('token', cookie)
              res.json({
                  sucess : true,
                  messege : "User has logged in!",
                  user : await userModel.findOne({emailAddress : emailAddress}).select('-password')
              })
          }
          else {
              res.json({
                  sucess : false,
                  messege : "Email id or password is wrong!",
                  status : 401
              })
          }
      })
    } catch (error) {
      return res.json({
          sucess : false,
          messege : "Internal server error!",
          status : 404
      })
    } 
  };

  // EDIT USER PERSONAL DETAILS   
  const editUserDetails = async(req,res)=> {
      const {fullName,emailAddress,address,profielImage, number} = req.body
      const userForEdit = await userModel.findOne({emailAddress})
      userForEdit.FullName = fullName || userForEdit.FullName
      userForEdit.emailAddress = emailAddress || userForEdit.emailAddress
      userForEdit.address = address || userForEdit.address
      userForEdit.profileImage = profielImage || userForEdit.profileImage
      userForEdit.number = number || userForEdit.number
      await userForEdit.save()
  }


  // GETTING LOGGEDINUSER DATA 
  const loggedInVandor = async(req,res)=> {
    res.json({
      status : 200,
      sucess : true,
      user : req.user,
      messege : "User is authenticated",
    })
  }


  module.exports = {
    register : userRegistration,
    login : userLogin,
    editUser : editUserDetails,
    loggedInVandor : loggedInVandor
  }