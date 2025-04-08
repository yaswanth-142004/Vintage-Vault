import { config } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { connection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routers/userRoutes.js";
import auctionItemRouter from "./routers/auctionItemRoutes.js";
import bidRouter from "./routers/bidRoutes.js"; 
import commissionRouter from "./routers/commissionRouter.js";
import superAdminRouter from "./routers/superAdminRoutes.js";

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

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auctionitem", auctionItemRouter);
app.use("/api/v1/bid", bidRouter);
app.use("/api/v1/commission", commissionRouter);
app.use("/api/v1/superadmin", superAdminRouter);



connection(); // This will connect to the database
app.use(errorMiddleware);
export default app;
