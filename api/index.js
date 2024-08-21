import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Routes from './routes/index.js';
dotenv.config();
const app = express();
app.use(express.json())

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('Connected to MongoDB')
})
.catch((err)=>{
    console.log(err)
});


app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
});

app.use('/api',Routes);

app.use((err, req, res, next ) => {
    const statusCode = err.statusCode || 500 ;
    const message = err.message || 'Internal Server Error' ;
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,    
    });
})