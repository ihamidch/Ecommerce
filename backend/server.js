import express from 'express'
import color from 'colors'
import connectDB from './config/db.js';
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'


const app = express();
app.use(express.json())
app.use(cors({origin:"http://localhost:5173",Credential:true}))

//middle wares 
app.use(morgan("dev"));
dotenv.config();


connectDB();

// import routes 
import userRoutes from './routes/userRoutes.js';
app.use("/api/v1/users",userRoutes)



const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>
{
    console.log(`server is listening at port ${PORT} `.bgBlue);
    console.log("check the node moon ".bgRed);
})