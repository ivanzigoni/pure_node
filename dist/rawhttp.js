"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const process_1 = require("process");
const server = http.createServer((req, res) => {
    req.on('data', chonk => {
        const parsedChunk = JSON.parse(chonk);
        const { url } = req;
        if (!url) {
            server.emit("default", res);
        }
        else if (url === "/home") {
            server.emit("home", parsedChunk, req, res);
        }
        else {
            server.emit("default", res);
        }
    });
});
server.on("response", (...args) => {
    const [res, responseObject] = args;
    res.end(JSON.stringify(responseObject));
});
server.on("home", (...args) => {
    const [parsedChunk, req, res] = args;
    req.pipe(process_1.stdout);
    server.emit("response", res, parsedChunk);
});
server.on("default", (...args) => {
    const [res] = args;
    server.emit("response", res, { message: "route not found" });
});
server.listen(3000);
