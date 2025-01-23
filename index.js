import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import productRouter from "./routes/productRouter.js";
import reviewRouter from "./routes/reviewRouter.js";

dotenv.config();

const app=express();

app.use(bodyParser.json());

app.use((req,res,next)=>{
    let token= req.header
    ("Authorization")
    
    if(token!=null){
        token=token.replace("Bearer ","")
        console.log(token)
       

        jwt.verify(token,process.env.JWT_SECRET,
        (err,decoded)=>{
            if(!err){
                req.user=decoded;
            }
          
        });
    }
    next()
     
});

let mongoUrl= process.env.MONGO_URL;

mongoose.connect(mongoUrl)

let connection = mongoose.connection


connection.once("open",()=>{
    console.log("MongoDB connection established successfully")   
})

app.use("/api/users",userRouter);
app.use("/api/products",productRouter);
app.use("/api/reviews",reviewRouter);



app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})


//jane1.doe@example.com   securepassword1234 -customer
//jane.doe@example.com  securepassword123 -admin