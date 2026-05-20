import express from "express";
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import postRouter from "./routes/posts.routes.js";
import userRouter from "./routes/user.routes.js"

dotenv.config();

const app = express();
app.use(express.json());

app.use(postRouter)
app.use(userRouter)
app.use(express.static('/uplods'))
app.use(cors());


const start =async () =>{
  try{
  const connectDB= await mongoose.connect(process.env.MONGO_URL)
  console.log("DB connected Successfully")
  }
  catch(err){
    console.log("DB did not connect",err)
  }

  app.listen(process.env.PORT, () => {
  console.log("Server is listining at port ",process.env.PORT)
  })
  

}

start();