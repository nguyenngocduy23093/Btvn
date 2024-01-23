import express from "express";
import { PostModel } from "../model/post.model.js";

const postController = express.Router();

postController.get("/", async (req, res) => {
  try {
    const query = req.query;
    const posts = await PostModel.find(query);
    res.status(200).send(posts);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

postController.get("/:postId", async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.postId);
    res.status(200).send(post);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

postController.post("/", async (req, res) => {
  try {
    const { userId, content, isPublic } = req.body;
    const createdAt = new Date().toISOString();
    // Validate input
    if (!userId) throw new Error("userId is required");
    if (!content) throw new Error("content is required");
    if (!isPublic) throw new Error("isPublic is required");
    // Lưu vào cơ sở dữ liệu
    const newPost = await PostModel.create({
      userId,
      content,
      isPublic,
      createdAt,
    });
    // Return status 201 + post document vừa được tạo trong mongodb
    res.status(201).send({
      data: newPost,
      message: "Post created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

postController.put("/:postId", async (req, res) => {
  try {
    // Lấy data từ body
    const { userId, content, isPublic } = req.body;
    const updatedAt = new Date().toISOString();
    const postId = req.params.postId;
    // Validate data
    if (!userId) throw new Error("userId is required");
    if (!content) throw new Error("content is required");
    if (!isPublic) throw new Error("isPublic is required");
    // Update post bằng postId
    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      {
        userId,
        content,
        isPublic,
        updatedAt,
      },
      { new: true }
    );

    res.status(200).send({
      data: updatedPost,
      message: "Post updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

postController.delete("/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    await PostModel.findByIdAndDelete(postId);
    // res.status(204).send('')
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

export { postController };
