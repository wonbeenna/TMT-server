import mongoose, { Schema } from "mongoose";
import { UserData } from "@interface";

const userDataSchema = new mongoose.Schema<UserData>({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  place: [
    {
      type: String,
    },
  ],
});
