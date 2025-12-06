import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
dotenv.config();

const PORT = process.env.PORT || 6000

let app = express()
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter)

app.get("/",(req,res)=>{
    res.send("hello from server")
})

app.listen(PORT,()=>{
    connectDb()
    console.log("Server started at port ", PORT)
})