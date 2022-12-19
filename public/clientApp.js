const socket = io()

let userName;

do{
    userName = prompt("Enter Your name: ");
}while(!userName)


function sendMsg(){
    console.warn("---msg Send",userName,socket.id);
}