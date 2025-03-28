class ErrorHandler extends Error{
    constructor(message,statusCode)
    {
        super(message);
        this.statusCode = statusCode;
    }
}
export const errorMiddleware = (err,req,res,next) =>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

if(err.name === "JsonWebTokenError")
{
    const message = "Json Web Token is invalid , try again";
    err = new ErrorHandler(message,400);
}

if(err.name === "TokenExpiredError")
{
    const message = "Json Web Token is expired , try again";
    err = new ErrorHandler(message,400);
}

if(err.name === "CastError")
    {
        const message = `Invalid ${err.path}`;
        err = new ErrorHandler(message,400);
    }
const errMessage = err.errors ? Object.values(err.errors).map((error) => error.message).join(" ") : err.message;

return res.status(err.statusCode).json({
    success:false,
    message: errMessage,
})




   
        
    
};

export default ErrorHandler;