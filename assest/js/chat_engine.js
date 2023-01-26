// This is client side
class chatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`${chatBoxId}`);
        this.userEmail = userEmail;
        // run this server in specified port the io file is given by cdn socket file
        this.socket = io.connect('http://localhost:5000');
        if(this.userEmail){
            connectionHandler();
        }
    }

    connectionHandler(){
       this.socket.on('connect', function(){
          console.log("connection established using sockets...!")
       });
    }
}