import dbConnect from "@/config/dbConnect";
import UsersModal from "@/models/users";
import bcrypt from "bcrypt";
import validator from 'validator'
import { serialize } from "cookie";
import { GenAccessToken } from "@/helpers/jwt";

export default async function handler(req, res) {
  await dbConnect();

  try {

    var bodyData = req.body


    if (bodyData.username) {
      if (bodyData.username.split(" ").length >= 2) {
        res.status(400).json({
          success: false,
          message: "Spaces are not allowed in Username!",
        });
        return
      }
      bodyData.username = bodyData.username.toLowerCase()

      var alreadyUsernameInUsedUser = await UsersModal.findOne({username:bodyData.username})
      if(alreadyUsernameInUsedUser){
        res.status(409).json({
          success: false,
          message: "Username Already in used!",
        });
        return
      }

    }

    if (!bodyData.password) {
      res.status(400).json({
        success: false,
        message: "Password Required!",
      });
      return
    }

    if(bodyData.email?.value){
      if(!validator.isEmail(bodyData.email?.value)){
        res.status(400).json({
          success: false,
          message: "Invalid Email Formate!",
        });
        return
      }

      // check for already existed email user
      var alreadyEmailInUsedUser = await UsersModal.findOne({"email.value":bodyData.email?.value})
      if(alreadyEmailInUsedUser){
        res.status(409).json({
          success: false,
          message: "Email Already in used!",
        });
        return
      }

    }else{
      delete bodyData.email
    }

    bodyData.password = await bcrypt.hash(bodyData.password, 10);
    var createdUser = await UsersModal.create(bodyData);

    // Generating Access Token
    const AccessToken = await GenAccessToken({
      id: createdUser._id,
    });

    // setting Cookies
    res.setHeader(
      "Set-Cookie",
      serialize("AccessToken", AccessToken, {
        path: "/",
        httpOnly: true,
      })
    );

    res.status(201).json({
      success: true,
      message: "Your are Registered Successfully!",
      data:createdUser
    });
    
  } catch (err) {


    // For duplication Error
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: `${Object.keys(err.keyPattern)[0]} is already in used!`,
      });
    }

    // required fields error handling
    var requiredFildName = Object.keys(err.errors)[0];

    if (requiredFildName) {
      return res.status(400).json({
        success: false,
        message: `${requiredFildName} is required!`,
      });
    }

    res.status(500).json({
      success: false,
      message: "Something Went Wrong!",
    });
  }

}