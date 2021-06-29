import { model, Schema, Document } from "mongoose";
import { Place } from "@interface";

const placeSchema = new Schema<Place>({
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
