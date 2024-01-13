import express from "express";
// import { users, posts } from "./data.js";

const server = express();

server.use(express.json()); // Middleware??

// Request - response cycle
// Request -> server route -> server handler -> response
// Request -> server route -> middleware 1 -> middleware 2.... -> server handler -> response
// Middleware = Function -> handler request object

const classes = [
  {
    id: 1,
    name: "Mindx 1",
    members: 50,
  },
  {
    id: 2,
    name: "Mindx 2",
    members: 10,
  },
  {
    id: 3,
    name: "Mindx 3",
    members: 20,
  },
];

// Request bao gồm: Đường dẫn - URL, method - Phương thức GET/POST/PUT/DELETE, headers, body
/// server.[HTTP-METHOD]("URL", handler)
server.get("/home", (request, response) => {
  //   console.log("requestHeader", request.headers);
  //   console.log("requestUrl", request.url);
  //   console.log("requestBody", request.body);
  //   console.log("requestMethod", request.method);
  response.status(200).send("Hello homie!");
});

// Request: method - POST, đường dẫn: /users
// Response: status - 201, data là 1 object user gồm tên và tuổi
server.post("/users", (request, response) => {
  response.status(201).send({
    name: "quang",
    age: 21,
  });
});

// Request: method - GET, đường dẫn: /classes
// Response: status - 200, data là classes
server.get("/classes", (req, res) => {
  const query = req.query;
  console.log("query", query);
  // Nếu có query là memberOver40: true thì trả những class có member > 40
  // Nếu không thì trả toàn bộ classes
  // URL : http://localhost:3000/classes?memberOver40=true&memberOver30=true

  if (query.memberOver40) {
    const over40 = classes.filter((item) => item.members > 40);
    res.status(200).send(over40);
  } else {
    res.status(200).send(classes);
  }
});

// POST để tạo mới
server.post("/classes", (req, res) => {
  console.log("params", req.params);
  console.log("body", req.body);
  // Tạo thêm 1 class vào mảng classes -> Về nhà làm
  res.status(201).send(classes);
});

// URL parameters <> URL query search parameters
// PUT method dùng để cập nhật data
// URL : classes/1 -> id = 1, classes/users -> id = 'users'
server.put("/classes/:id", (req, res) => {
  console.log("params", req.params);
  console.log("body", req.body);
  // Dùng hàm thao tác mảng để cập nhật mảng classes
  // ...
  const index = classes.findIndex((item) => item.id === Number(req.params.id));
  classes[index] = req.body;
  res.status(200).send(classes);
});

// DELETE method dùng để xoá data
server.delete("/classes/:id", (req, res) => {
  console.log("params", req.params);
  // Về nhà làm
  res.status(204).send(classes);
});

// Syntax query parameters - search parameters
// http://localhost:3000/classes - URL
// http://localhost:3000/classes?members=10 - URL with query params

// Request: method - GET, đường dẫn: /classes, chỉ lấy classes có số lượng member > 40
// Response: status - 200, data là classes
// server.get("/classes/over40", (req, res) => {
//   res.status(200).send(classes.filter((item) => item.members > 40));
// });

// Request: method - POST, đường dẫn: /classes, body là 1 class mới
// Response: status - 201, data là new classes

server.listen(3000, () => {
  console.log("Server running!");
});
