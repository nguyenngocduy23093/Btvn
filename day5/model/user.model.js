import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  // _id: ObjectId,
  userName: String,
  email: String,
  age: Number,
  avatar: String,
});

const UserModel = mongoose.model("user", UserSchema);

export { UserModel };
