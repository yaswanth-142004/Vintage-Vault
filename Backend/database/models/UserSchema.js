import mongoose  from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        minLenght : [5, "User name should be atleast 5 characters"],
        maxLenght : [50, "User name should be atmost 20 characters"],

    },
    password:{
        type:String,
        selected:false,
        minLength : [8, "Password should be atleast 8 characters"],
        maxLength : [20, "Password should be atmost 20 characters"],

    },
    email:String,
    phoneNumber:{
        type:String,
        minLength : [10, "Phone number should be atleast 10 digits"],
        maxLength : [10, "Phone number should be atmost 10 digits"],
    },
    profileImage:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        },


    },
    paymentMethods:{
        bankTransaction:{
            accountNumber:String,
            accountName :String,
            IFSCCode:String,
            bankName:String,
        },
        UPI:{
            upiId:String,
        },

    },
    role:{
        type :String,
        enum : ["Seller" , "Buyer" , "Admin"]
    },
    unpaidCommission:{
        type:Number,
        default:0,
    },
    auctionsWon:{
        type:Number,
        deafault :0,

    },
    moneySpent:{
        type:Number,
        deafault:0,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },



});

export const User = mongoose.model("User",userSchema)