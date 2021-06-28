import mongoose, { Schema } from "mongoose";
import { UserData } from "../interface/index";

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
