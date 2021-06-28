import { Request, Response } from "express";
import userModel from "../../database/user";
export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    let user = new userModel();
    user.name = name;
    user.email = email;
    user.password = password;
    user
      .save()
      .then((newUser) => {
        console.log("Create 완료");
        res.status(200).json({
          message: "Create success",
          data: {
            post: newUser,
          },
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: err,
        });
      });
  } catch (err) {
    res.end();
  }
};
