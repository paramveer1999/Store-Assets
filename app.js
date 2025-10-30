const express = require('express');
const mongoose  =require('mongoose');
const app  = express();
const bodyParser = require('body-parser');
const http = require('http');
const dotenv = require('dotenv');
const asset  = require('./routes/asset');
dotenv.config(); 
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Method','GET,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers','Content-Type');
    next()
})
app.use(bodyParser.json())
app.use(asset)


mongoose.connect(process.env.MONGODB_URI).then(result =>{
    const server = http.createServer(app);
    console.log('database connected')
    server.listen(1234)
}).catch(err => console.log(err))