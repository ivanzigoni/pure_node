import * as http from 'http'
import { stdout } from 'process';

const server = http.createServer((req, res) => {
  req.on('data', chonk => {
    const parsedChunk = JSON.parse(chonk);
    
    const { url } = req;

    if (!url) {
      server.emit("default", res);
    } else if (url === "/home") {
      server.emit("home", parsedChunk, req, res)
    } else {
      server.emit("default", res);
    }


  })
})

server.on("response", (...args) => {
  const [res, responseObject] = args;
  res.end(JSON.stringify(responseObject));
})

server.on("home", (...args) => {
  const [parsedChunk, req, res] = args;

  req.pipe(stdout)

  server.emit("response", res, parsedChunk)
})

server.on("default", (...args) => {
  const [res] = args;

  server.emit("response", res, { message: "route not found" })
})

server.listen(3000);