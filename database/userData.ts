import { model, Schema, Document } from "mongoose";
import { UserData } from "@interface";

const userDataSchema = new Schema<UserData>({
  email: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  place: [
    {
      type: String,
    },
  ],
});

const userDataModel = model<UserData & Document>("userData", userDataSchema);

export default userDataModel;
