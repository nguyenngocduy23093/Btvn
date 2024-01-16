import express from "express";
import axios from "axios";
import { v4 } from "uuid";

const server = express();

server.use(express.json());

// axios.get("http://localhost:8000/posts").then((res) => console.log(res.data));
server.get("/users", async (request, response) => {
  try {
    // Dùng axios GET data từ database mô phỏng (jsonserver)
    const { data } = await axios.get("http://localhost:8000/users");
    response.status(200).send(data);
  } catch (error) {
    console.log(error);
    response.status(500).send("Server error!");
  }
});

// API lấy bài posts
server.get("/posts", async (request, response) => {
  try {
    // Dùng axios GET data từ database mô phỏng (jsonserver)
    const { data } = await axios.get("http://localhost:8000/posts");
    response.status(200).send(data);
  } catch (error) {
    console.log(error);
    response.status(500).send("Server error!");
  }
});

// server.get("/post1", async (request, response) => {
//   try {
//     // Thêm try-catch block cho các đoạn code nghi ngờ có khả năng lỗi và làm server crash
//     const { data } = await axios.get("http://localhost:9000/posts");
//     response.status(200).send(data);
//   } catch (error) {
//     console.log(error);
//     response.status(500).send("Server error!");
//   }
// });

server.post("/users", async (req, res) => {
  const body = req.body;
  try {
    // Try-catch dùng khi muốn validate(kiểm tra tính đúng đắn) thông tin được gửi lên từ người dùng và throw (ném)
    // ra những lỗi custom của lập trình viên
    if (!body.userName) throw new Error("Khong chua userName");
    if (!body.email) throw new Error("Khong chua email");
    if (!body.age) throw new Error("Khong chua age");
    if (!body.avatar) throw new Error("Khong chua avatar");

    // Xu ly logic
    const id = v4(); // Tạo ra 1 chuỗi random có thể dùng làm id duy nhất
    // Luu vao database voi jsonserver và gửi lại thông tin vừa lưu
    const { data: newUser } = await axios.post("http://localhost:8000/users", {
      ...body,
      id,
    });
    // Gui lai client new user
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(`Data gui len khong hop le - ${error.message}`);
  }
});


server.listen(3000, () => {
  console.log("Server is running!");
});
