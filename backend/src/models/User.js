import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: String,
    email: { type: String, required: true, unique: true },
    password: String,
    googleId: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
