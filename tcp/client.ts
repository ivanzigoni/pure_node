import { randomBytes } from 'crypto';
import { on } from 'events';
import * as net from 'net';

var client  = new net.Socket();

client.on('connect',function(){


  // writing data to server
  client.write('hello from client');
});

client.on("data", (data) => {
  console.log(data.toString());
})

setInterval(() => {
  const randomBuffer = randomBytes(
    4
  ).toString("hex")

  client.write(Buffer.from(randomBuffer).toString())
}, 5000)

client.connect({
  port:3000
});

