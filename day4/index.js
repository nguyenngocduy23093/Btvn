import express from "express";
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogPost = new Schema({
  author: String,
  title: String,
  body: String,
  date: String,
});

const BlogModel = mongoose.model("blog", BlogPost);

// 127.0.0.1 = localhost = 0.0.0.0
async function connectDb() {
  await mongoose.connect(
    // "mongodb+srv://admin:admin@cluster0.1diowix.mongodb.net/mindx"
    "mongodb://localhost:27017"
  );
}

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).send("Hello!");
});

// RESTful API
/// Get many without id in query params - lấy thông tin chung của toàn bộ database
server.get("/blogs", async (req, res) => {
  try {
    const query = req.query;
    const blogs = await BlogModel.find(query);
    res.status(200).send(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error!");
  }
});

/// Get one with id - API lấy detail của 1 data
server.get("/blogs/:blogId", async (req, res) => {
  try {
    const blogId = req.params.blogId;
    // const blog = await BlogModel.findById(blogId).select({ author: 0 });
    const blog = await BlogModel.findById(blogId);
    res.status(200).send(blog);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error!");
  }
});

server.post("/blogs", async (req, res) => {
  try {
    // const newBlog = new BlogModel({
    //   author: "Nam",
    //   title: "Hello",
    //   body: "Hello world from Mindx!",
    //   date: new Date(),
    // });

    // await newBlog.save();

    const body = req.body;
    // Validate input
    if (!body.author) throw new Error("Author field is required!");
    if (!body.title) throw new Error("Title field is required!");
    if (!body.body) throw new Error("Body field is required!");
    if (!body.date) throw new Error("Date field is required!");

    const newBlog = await BlogModel.create({
      author: body.author,
      title: body.title,
      body: body.body,
      date: body.date,
    });

    res.status(201).send(newBlog);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

server.put("/blogs/:blogId", async (req, res) => {
  try {
    const blogs = await BlogModel.updateOne({});
    res.status(200).send(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error!");
  }
});

server.delete("/blogs/:blogId", async (req, res) => {
  try {
    const blogs = await BlogModel.deleteOne();
    res.status(200).send(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error!");
  }
});

// RESTful API for post with user field inside
server.get("/posts/user/:userId", async (req, res) => {
  try {
    const blogs = await BlogModel.deleteOne();
    res.status(200).send(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error!");
  }
});

// BTVN
// Viết nốt CRUD cho bài blog
// Viết Model + Schema cho db.json ở day3

connectDb().then(
  server.listen(3000, () => {
    console.log("Server is running!");
  })
);
