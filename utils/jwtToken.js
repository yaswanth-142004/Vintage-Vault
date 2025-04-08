import jwt from "jsonwebtoken";

export const generateToken = (user,message,statusCode,res)=>{
    const token = user.generateJwtToken();
    res
    .status(statusCode)
    .cookie("token",token,{
        expires : new Date(
            // Date.now() + Number(process.nextTick.COOKIE_EXPIRE)*24*60*60*1000),
            Date.now() + 1000*60*60*24*30), // 30 days
            httpOnly : true
    }).
    json({
        success:true,
        message,
        user,
        token,
    });
    

};
