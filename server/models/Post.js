import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "Please,provide userId"],
    },
    firstName: {
      type: String,
      required: [true, "Please,provide first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please,provide last name"],
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
