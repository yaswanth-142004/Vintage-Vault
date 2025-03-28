import mongoose  from "mongoose";
export const connection = async () => {
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "VINTAGE_VAULT",

    }).then(()=>{
        console.log("Database connected successfully");
    }).catch((err)=>{
        console.log("Database connection failed",err);
    })
}