import { User } from "../database/models/UserSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { v2 as cloudinary } from 'cloudinary';

export const register = async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Profile Image", 400));
  }

  const { profileImage } = req.files;
  const allowedFormats = ["image/png", "imag/jpeg", "image/webp"];
  if (!allowedFormats.includes(profileImage.mimetype)) {
    return next(new ErrorHandler("File format not supported ", 400));
  }

  const {
    userName,
    password,
    email,
    phoneNumber,
    address,
    role,
    accountNumber,
    accountName,
    bankName,
    IFSCCode,
    upiId,
  } = req.body;


    if (
        !userName ||
        !password ||
        !email ||
        !phoneNumber ||
        !address ||
        !role 
        
    ) {
        return next(new ErrorHandler("Please fill all the fields", 400));
    }
    if(role === "Seller")
    {
        if (!accountNumber || !accountName || !bankName || !IFSCCode) {
            return next(new ErrorHandler("Please fill your bank details", 400));
        }

        if(!upiId)
        {
            return next(new ErrorHandler("Please fill your UPI ID",400));
        }
    }

    const isRegistered = await User.findOne({email});
    if(isRegistered)
    {
        return next(new ErrorHandler("User aldready exist with this email", 400));
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(profileImage.tempFilePath,{
        folder:"VINTAGE_VAULT_USERS",
    });

    if(!cloudinaryResponse || cloudinaryResponse.error)
    {
        console.error("cloudinary error",cloudinaryResponse.error || "unknown cloudainary error");

    return next(new ErrorHandler("Error uploading image to cloudinary ",500));
    }

    // Now there are no users then we need to store the user details 


const user = await User.create({
    userName,
    email,
    password,
    phoneNumber,
    address,
    role,
    profileImage :{
        public_id : cloudinaryResponse.public_id,
        url : cloudinaryResponse.secure_url,
    },
    paymentMethods:{
        bankTransaction :{
            accountNumber,
            accountName,
            IFSCCode,
            bankName,
        },
        UPI:{
            upiId,
        },
    },
});

res.status(201).json({
    success:true,
    message:"User registered successfully",
    
});





};
