import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PostSchema = new Schema({
  // _id: ObjectId,
  userId: String,
  content: String,
  createdAt: String,
  updatedAt: String,
  isPublic: Boolean,
});

const PostModel = mongoose.model("post", PostSchema);

export { PostModel };
