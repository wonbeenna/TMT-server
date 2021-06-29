import { model, Schema, Document } from "mongoose";
import { DB } from "@interface";

const dbSchema = new Schema<DB>({
  place: {
    type: String,
    required: true,
  },
  theme: [
    {
      type: String,
    },
  ],
  province: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  long: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
  },
});

const dbModel = model<DB & Document>("db", dbSchema);

export default dbModel;
