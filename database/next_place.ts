import { model, Schema, Document } from "mongoose";
import { Next_Place } from "@interface";

const nextPlaceSchema = new Schema<Next_Place>({
  place_name: {
    type: String,
  },
  next_place: [{ type: Object }],
});

const nextPlaceModel = model<Next_Place & Document>(
  "next_place",
  nextPlaceSchema
);

export default nextPlaceModel;
