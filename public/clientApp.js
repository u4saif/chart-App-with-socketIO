const socket = io()

let userName;

do{
    userName = prompt("Enter Your name: ");
}while(!userName)

let testMsg = document.querySelector("#textarea");
let messageArea = document.querySelector('.message__area')
testMsg.addEventListener('keyup',(e)=>{
    (e.key=='Enter') ? sendMsg(e.target.value) : '';
})

function sendMsg(message){
    var msg={
        user: userName,
        message: message.trim()
    }
    console.warn("---msg Send : ",msg);
      // Append 
      appendMessage(msg, 'outgoing')
      textarea.value = ''
      scrollToBottom()
  
      // Send to server 
      socket.emit('message', msg)
  
  }
  
  function appendMessage(msg, type) {
      let mainDiv = document.createElement('div')
      let className = type
      mainDiv.classList.add(className, 'message')
  
      let markup = `
          <h4>${msg.user}</h4>
          <p>${msg.message}</p>
      `
      mainDiv.innerHTML = markup
      messageArea.appendChild(mainDiv)
  }
  
  // Receive messages 
  socket.on('message', (msg) => {
      appendMessage(msg, 'incoming')
      scrollToBottom()
  })
  
  function scrollToBottom() {
      messageArea.scrollTop = messageArea.scrollHeight
  }