import { model, Schema, Document } from "mongoose";
import { plan } from "@interface";

const planSchema = new Schema<plan>({
  name: {
    type: String,
    ref: "User",
  },
  email: {
    type: String,
    ref: "User",
  },
  spot: {},
});

const planModel = model<plan & Document>("plan", planSchema);

export default planModel;
