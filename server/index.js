const express=require('express');

const registerRoutes=require('./routes/register');
const loginRoutes=require('./routes/login');
const adminRoutes=require('./routes/admin');

 const connectDB=require('./db/connect');
 require('dotenv').config();

const app=express();


app.use('/api/register',registerRoutes);
app.use('/api/login',loginRoutes);
app.use('/api/admin',adminRoutes);

const port=3002;

const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port ,console.log(`server started on ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start()

// app.listen(3000)