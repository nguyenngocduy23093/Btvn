// import { foo } from "./util.js";
import http from "node:http";

// const name = " MindX!";

// console.log(foo + name); // Xin chào MindX!

const server = http.createServer((request, response) => {
  console.log(request.url);
  console.log(request.method);
  console.log(request.body);
  console.log(request.headers);
  switch (request.url) {
    case "/":
      response.end(
        JSON.stringify({ endpoint: request.url, method: request.method })
      );
      break;
    case "/hello":
      response.end(JSON.stringify("Hello man!"));
      break;

    default:
      response.end(JSON.stringify("Not found!"));
      break;
  }
});

server.listen(3000);

console.log("Server running!");
