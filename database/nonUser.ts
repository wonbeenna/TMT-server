import { model, Schema, Document } from "mongoose";
import { NonUser } from "@interface";

const nonUserSchema = new Schema<NonUser>({
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60,
  },
});

const nonUserModel = model<NonUser & Document>("nonUser", nonUserSchema);

export default nonUserModel;
