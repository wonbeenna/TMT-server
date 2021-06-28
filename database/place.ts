import { model, Schema, Document } from "mongoose";
import { Place } from "@interface";

const placeSchema = new Schema<Place>({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
  },
  next_place_name: [
    {
      type: String,
    },
  ],
});

const placeModel = model<Place & Document>("place", placeSchema);

export default placeModel;
