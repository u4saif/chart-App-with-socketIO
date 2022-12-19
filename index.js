const express = require('express');
const app=express();
const server=require("http").createServer(app);

const PORT= process.env.PORT || 5000;

server.listen(PORT,()=>{
    console.log(`Server is Listing at PORT: ${PORT}`);
}) 

app.use(express.static(__dirname+'/public'))
app.get("/chat",(req,res)=>{
    console.log(req.url);
    res.sendFile(__dirname+'/index.html');

})

//Socket initialization 
const io = require("socket.io")(server)

io.on('connection',(socket)=>{
    console.log("---ClientConnected----",socket.id)
})