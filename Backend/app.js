import { config } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { connection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";


const app = express();

config({
    path:"./config/config.env",
});

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methiods: ["POST" ,"GET","PUT","DELETE"],
    credentials:true,

}))

app.use(cookieParser());
app.use(express.json()); // It will parse the data from the form and convert it into JSON format
app.use(express.urlencoded({extended:true})); // It will parse the data from the form and convert it into JSON format
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp",
}))

connection(); // This will connect to the database
app.use(errorMiddleware);
export default app;
