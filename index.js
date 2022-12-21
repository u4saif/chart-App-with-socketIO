const express = require('express');
const { disconnect } = require('process');
const app=express();
const server=require("http").createServer(app);

const PORT= process.env.PORT || 5000;

server.listen(PORT,()=>{
    console.log(`Server is Listing at PORT: ${PORT}`);
}) 

app.use(express.static(__dirname+'/public'))
app.get("/chat",(req,res)=>{
    res.sendFile(__dirname+'/index.html');

})

//Socket initialization 
const io = require("socket.io")(server);

//List of user connected 
var usersList=[];
function userObject(id,user){
    this.id=id;
    this.user=user; 
}

io.on('connection',(socket)=>{

    socket.on("userAdded",(msg)=>{
        let user = new userObject(socket.id,msg);
        usersList.push(user);
        socket.broadcast.emit("userAdded",msg)
    })
    socket.on("message",(msg)=>{
        socket.broadcast.emit("message",msg)
    })

    socket.on('disconnect', (msg) => {
     
        leftUserName=usersList.find((i)=>{return i.id==socket.id});
        const user = leftUserName?.user || 'no name';
        socket.broadcast.emit("userLeft",user);
      });
})