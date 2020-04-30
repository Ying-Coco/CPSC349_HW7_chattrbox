var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
    port: port
});
var messages = [];
var topic = '/topic';
var topic_changed = false;
var topic_new;

console.log('websockets server started');

ws.on('connection', function (socket) {
    console.log('client connection established');
    if (topic_changed == true){
      ws.clients.forEach(function (clientSocket) {
        clientSocket.send(("Topic has changed to '" + topic_new))
      });
    }
    messages.forEach(function (msg) {
      socket.send(msg);
  });
  
    socket.on('message', function (data) {
      console.log('message received: ' + data);
      if (data.includes(topic) == true){
        topic_changed = true;
        topic_new = data.substring(7);
        ws.clients.forEach(function (clientSocket) {
          clientSocket.send("Topic has changed to '"+ topic_new);
      });
    
      } 
      else {
      messages.push(data);
      ws.clients.forEach(function (clientSocket) {
        clientSocket.send(data)
      });
    }
  });
  });
