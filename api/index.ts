import express from "express";
import cookieParser from "cookie-parser";

const server = express();

server.use(cookieParser());

server.post("/login", (req, res) => {

});

server.listen("8080", () => { console.log("Server started") });