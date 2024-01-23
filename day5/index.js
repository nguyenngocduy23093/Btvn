import express from "express";
import mongoose from "mongoose";
import { postController } from "./controller/post.controller.js";
import { userController } from "./controller/user.controller.js";
import morgan from "morgan";

const server = express();

// Cách 1 dùng server.use() -> biến đổi req, res object
server.use(express.json());
server.use(morgan("combined"));

//express.json() = function (req, res, next) {}

// Request -> Server -> Response (request-response cycle)
// Request -> Controller -> Model -> Controller -> Response (request-response cycle)
// Request -> Middleware -> Controller -> Logic handler + Model -> Controller -> Response (request-response cycle)
// Request -> Controller -> Middleware -> Logic handler + Model -> Controller -> Response (request-response cycle)
// Request -> Controller -> Middleware -> Logic handler + Model -> Controller -> Middleware -> Response (request-response cycle)

// Cách 3 ->> Middleware (là 1 function)
function testMiddleware(req, res, next) {
  try {
    const { ip, headers, body, url } = req;
    console.log("Test middleware!");
    next();
  } catch (error) {
    res.status(500).send("Server error!");
  }
}
// Middleware global - apply for all routes
// server.use(testMiddleware);

// Cách 2 dùng server.use() -> gộp routing từ các file riêng biệt vào server
server.use("/posts", postController);
server.use("/users", userController);

// Connection string
mongoose
  .connect("mongodb://localhost:27017/fullstack")
  .then(() => server.listen(3000, () => console.log("Server is running!")));
