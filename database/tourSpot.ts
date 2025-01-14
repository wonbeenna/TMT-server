import { model, Schema, Document } from "mongoose";
import { TourSpot } from "@interface";

const tourSpotSchema = new Schema<TourSpot>({
  email: {
    type: String,
    ref: "User",
  },
  spot: [
    {
      type: Array,
    },
  ],
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
});

const tourSpotModel = model<TourSpot & Document>("tourSpot", tourSpotSchema);

export default tourSpotModel;
