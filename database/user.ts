import { model, Schema, Document } from "mongoose";
import { User } from "@interface";

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userModel = model<User & Document>("user", userSchema);

export default userModel;
// export const createUser = async (user: User): Promise<boolean> => {
//   try {
//     const newUser = new userModel(user);
//     const result = await newUser.save();
//     console.log(result);
//     console.log("User save OK");
//     return true;
//   } catch (err) {
//     console.error("User save error : ", err.message);
//     return false;
//   }
// };
