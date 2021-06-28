import { model, Schema, Document } from "mongoose";
import { TourSpot } from "@interface";

const tourSpotSchema = new Schema<TourSpot>({
  id: {
    type: Number,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  spot: {
    type: String,
  },
  day: {
    type: String,
  },
});

const tourSpotModel = model<TourSpot & Document>("tourSpot", tourSpotSchema);

export default tourSpotModel;
