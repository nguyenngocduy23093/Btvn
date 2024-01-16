import express from "express";
import axios from "axios";
import { users, posts } from "./db.json";

const app = express();
app.use(express.json());
//  1 Viết API việc đăng ký user với userName, id sẽ được là một string ngẫu nhiên, không được phép trùng, bắt đầu từ ký tự US (ví dụ: US8823).

const registeredIds = new Set(); // Dùng Set để lưu trữ các id đã được đăng ký

app.post("/users", async (req, res) => {
  const { userName } = req.body;

  try {
    if (!userName) {
      throw new Error("Missing userName in request body");
    }

    let randomId;
    do {
      const randomNum = Math.floor(Math.random() * 9000) + 1000;
      randomId = `US${randomNum}`;
    } while (registeredIds.has(randomId));

    const newUser = { userName, id: randomId };

    const response = await axios.post("http://localhost:8000/users", newUser);

    registeredIds.add(randomId); // Thêm id vào Set đã đăng ký

    res.status(201).send(response.data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
// 2 .  Viết API cho phép user tạo bài post (thêm bài post, xử lý id tương tự user).
app.post("/posts", (req, res) => {
  try {
    const { userId, content } = req.body;

    // Kiểm tra xem userId có tồn tại trong mảng users hay không
    const user = users.find((user) => user.id === userId);

    if (!user) {
      throw new Error("Người dùng không tồn tại.");
    }

    // Tạo id bài post ngẫu nhiên
    const postId = "POST" + Math.random().toString(36).substr(2, 10);

    // Thêm bài post mới vào mảng posts
    const newPost = { postId, userId, content };
    posts.push(newPost);

    res
      .status(201)
      .json({ message: "Tạo bài post thành công.", post: newPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3 . Viết API cho phép user chỉnh sửa lại bài post (chỉ user tạo bài viết mới được phép chỉnh sửa).
app.put("/posts/:postId", (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, content } = req.body;

    const user = users.find((user) => user.id === userId);

    if (!user) {
      throw new Error("Người dùng không tồn tại.");
    }

    const post = posts.find((post) => post.postId === postId);

    if (!post) {
      throw new Error("Bài post không tồn tại.");
    }

    if (user.id !== post.userId) {
      throw new Error("Bạn không có quyền chỉnh sửa bài viết này.");
    }

    post.content = content;

    res.status(200).json({ message: "Chỉnh sửa bài post thành công.", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// 4. Viết API cho phép user được comment vào bài p

app.post("/posts/:postId/comments", (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, comment } = req.body;

    const user = users.find((user) => user.id === userId);

    if (!user) {
      throw new Error("Người dùng không tồn tại.");
    }

    const post = posts.find((post) => post.postId === postId);

    if (!post) {
      throw new Error("Bài post không tồn tại.");
    }

    const newComment = { userId, comment };
    post.comments.push(newComment);

    res
      .status(201)
      .json({ message: "Bình luận thành công.", comment: newComment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
