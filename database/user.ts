import mongoose from "mongoose";
import { User } from "@interface";

const userSchema = new mongoose.Schema<User>({
  id: {
    type: String,
    require: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
