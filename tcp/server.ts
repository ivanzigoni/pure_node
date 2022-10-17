import * as net from 'net';
import { EventEmitter } from 'stream';

const server = net.createServer()

const emmiter1 = new EventEmitter()


server.on("connection", (socket) => {
  console.log("alguém conectou")
  socket.on("data", (data) => {
    emmiter1.emit("response", socket, data);
  })
})

emmiter1.on("response", (...args) => {
  const [socket, data] = args;
  const dataLength = data.toString().length;

  socket.write(String(dataLength));
})

server.on('close',function(){
  console.log('Server closed !');
});

server.listen(3000)