import { model, Schema, Document } from "mongoose";
import { NonUser } from "@interface";

const nonUserSchema = new Schema<NonUser>({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
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
    index: { expires: "60*60*24" },
  },
});

const nonUserModel = model<NonUser & Document>("nonUser", nonUserSchema);

export default nonUserModel;
