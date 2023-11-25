const express=require('express');

const registerRoutes=require('./routes/register');
const loginRoutes=require('./routes/login');

const app=express();

app.use('/api/register',registerRoutes);
app.use('/api/login',loginRoutes);

app.listen(3000,console.log("server started..."));