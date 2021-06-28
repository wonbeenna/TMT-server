import { model, Schema, Document } from "mongoose";
import { Next_Place } from "@interface";

const nextPlaceSchema = new Schema<Next_Place>({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  place_id: {
    type: Schema.Types.ObjectId,
    ref: "Place",
  },
  next_place: [
    {
      type: String,
    },
  ],
});

const nextPlaceModel = model<Next_Place & Document>(
  "next_place",
  nextPlaceSchema
);

export default nextPlaceModel;
