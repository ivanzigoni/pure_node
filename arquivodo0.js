const { stdin, stdout } = require("process");
const fs = require("fs");


const ws = fs.createWriteStream("files/output.txt")
// stdin.on("data", (data) => {
//   console.log(data)
// })



stdin.setRawMode(true)

stdin.pipe(ws)