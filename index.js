const express = require('express');
const app=express();
const server=require("http").createServer(app);

const PORT= process.env.PORT || 5000;

server.listen(PORT,()=>{
    console.log(`Server is Listing at PORT: ${PORT}`);
}) 

app.get("/chat",(req,res)=>{
    console.log(req.url);
    res.sendFile(__dirname+'/index.html');

})