import dbConnect from "@/config/dbConnect";
import UsersModal from "@/models/users";
import RewardsModal from "@/models/rewards";
import bcrypt from "bcrypt";
import validator from 'validator'
import { serialize } from "cookie";
import { GenAccessToken } from "@/helpers/jwt";
import generateRandomCode from "@/helpers/GenerateRandomCode"; 
import { StatusCodes } from 'http-status-codes';

async function generateUniqueToken(length=6) {
  const token = generateRandomCode(length);

  const isAlreadyExist = await UsersModal.findOne({referral_code: token});

  if (isAlreadyExist) {
    generateRandomCode(length);
  }

  return token;
}

async function validateRefralCode(referral_code) {
  const user = await UsersModal.findOne({referral_code});

  if (!user) return {user: null, invalid: true};

  return {user, invalid: false};
}

export default async function handler(req, res) {
  await dbConnect();
  try {
    const {userType, referral_code} = req.body;

    if (String(userType).toLowerCase() == 'admin') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid request",
      });
      return
    }

    if (!req.body.password) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Password Required!",
      });
      return
    }

    if(req.body.email){
        if(!validator.isEmail(req.body.email?.value)){
          res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Enter a valid Email Address!",
          });
          return
        }
    }

    var userDetails = null;
    if (referral_code) {
      const {invalid, user} = await validateRefralCode(referral_code);
      userDetails = user;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const new_referral_code = await generateUniqueToken(8);

    const createdUser = await UsersModal.create({
      ...req.body,
      referral_code: new_referral_code,
      referred_by: userDetails ? userDetails.referral_code: '',
      password: hashedPassword,
    });

    if (userDetails) {
      await RewardsModal.create({
        referred_by: userDetails._id,
        referred_to: createdUser._id,
        amount_type: 'percentage',
        reward_amount: 5
      })
    }

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

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Your are Registered Successfully!",
      data:createdUser
    });
    
  } catch (err) {
    console.log("err--------->", err)
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