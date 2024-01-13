import express from "express";
import { users, posts } from "./data.js";
import { v4 as uuidv4 } from "uuid";
uuidv4();
const server = express();

server.use(express.json());

// 1. Viết API lấy thông tin của user với id được truyền trên params.
server.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const findUser = users.find((item) => item.id === id);
  if (findUser) {
    res.status(200).send(findUser);
  } else {
    res.status(404).send("Không tìm thấy người dùng.");
  }
});

//  2. Viết API tạo user với các thông tin như trên users, với id là random (uuid), email là duy nhất, phải kiểm tra được trùng email khi tạo user. F
server.post("/users", (req, res) => {
  const { userName, email, age, avatar } = req.body;

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    res.status(409).json({ error: "Email đã tồn tại." });
  } else {
    const newUser = {
      id: uuidv4(),
      userName,
      email,
      age,
      avatar,
    };

    users.push(newUser);

    res.status(201).json(newUser);
  }
});
//  3.  Viết API lấy ra các bài post của user được truyền userId trên params.
server.get("/users/:userId/posts", (req, res) => {
  const { userId } = req.params;

  const userPosts = posts.filter((post) => post.userId === userId);

  res.status(200).json(userPosts);
});

// 4. Viết API thực hiện tạo bài post với id của user được truyền trên params.
server.post("/posts/:userId", (req, res) => {
  const userId = req.params.userId;
  const { content, isPublic } = req.body;

  // Kiểm tra xem userId có tồn tại trong danh sách người dùng hay không
  const userExists = posts.find((post) => post.userId === userId);

  if (userExists) {
    const newPost = {
      userId,
      postId: uuidv4(),
      content,
      createdAt: new Date().toISOString(),
      isPublic,
    };

    posts.push(newPost);

    res.status(201).json(newPost);
  } else {
    res
      .status(409)
      .json({ error: "Không thành công, userId không tồn tại trong bài viết" });
  }
});
// 5.  Viết API cập nhật thông tin bài post với postId được truyền trên params, chỉ có user tạo bài mới được phép.
server.put("/posts/:postId/:userId", (req, res) => {
  const postId = req.params.postId;
  const userId = req.params.userId;
  const { content } = req.body;

  const post = posts.find(
    (post) => post.postId === postId && post.userId === userId
  );

  if (post) {
    // Cập nhật nội dung bài post
    post.content = content;
    res
      .status(200)
      .json({ message: "Cập nhật thông tin bài post thành công." });
  } else {
    res
      .status(401)
      .json({ error: "Bạn không có quyền cập nhật bài post này." });
  }
});

// 6. Viết API xoá bài post với postId được truyền trên params, chỉ có user tạo bài mới được phép.
server.delete("/posts/:postId/:userId", (req, res) => {
  const postId = req.params.postId;
  const userId = req.params.userId;

  const postIndex = posts.findIndex(
    (post) => post.postId === postId && post.userId === userId
  );

  if (postIndex !== -1) {
    posts.splice(postIndex, 1);

    res.status(200).json({ message: "Xoá bài post thành công." });
  } else {
    res.status(401).json({ error: "Bạn không có quyền xoá bài post này." });
  }
});
// 7 Viết API tìm kiếm các bài post với content tương ứng được gửi lên từ query params.
// Câu này em chưa biết làm ạ 

// 8 . Viết API lấy tất cả các bài post với isPublic là true, false thì sẽ không trả về.
server.get('/posts', (req, res) => {
    const publicPosts = posts.filter(post => post.isPublic === true);
  
    res.status(200).json(publicPosts);
  });
  
  server.listen(3000, () => {
    console.log('Server đang chạy ');
  });