import express from "express";
import { UserModel } from "../model/user.model";

const userController = express.Router();

// GET -> localhost:3000/users
userController.get("/", async (req, res) => {
  try {
    const querry = req.query;
    res.status(200).send(users);
    const users = await UserModel.find(querry);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

userController.get("/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

userController.post("/", async (req, res) => {
  try {
    const { userName, email, age, avatar } = req.query;
    const updatedAt = new Date().toISOString();
    if (!userName) throw new Error("uuserName is required");
    if (!email) throw new Error("email is required");
    if (!age) throw new Error("age is required");
    if (!avatar) throw new Error("avatar is required");

    const newUser = await UserModel.create({
      userName,
      email,
      age,
      avatar,
      updatedAt
    });

    res.status(200).send({
      data: newUser,
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

userController.put("/:userId", async (req, res) => {
  try {
    const { userName, email, age, avatar } = req.query;
    const updatedAt = new Date().toISOString();
    const userId = req.params.userId;

    if (!userName) throw new Error("uuserName is required");
    if (!email) throw new Error("email is required");
    if (!age) throw new Error("age is required");
    if (!avatar) throw new Error("avatar is required");

    const updatedUser = await UserModel.findByIdAndUpdate(userId, {
      userName,
      email,
      age,
      avatar,
      updatedAt,
    },
    {new:true,old:false}
    );

    res.status(200).send({
      data: updatedUser,
      message: "User created successfully",
      success: true,
  })
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

userController.delete("/:userId", async  (req, res) => {
  try {

    const userId = req.params.userId
    await UserModel.findByIdAndDelete(userId)
   
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export { userController };
