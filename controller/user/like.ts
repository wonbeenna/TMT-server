import userDataModel from "database/userData";
import { Request, Response } from "express";

export const likePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, place } = req.body;
    let userData = new userDataModel();
    userData.email = email;
    userData.place = place;
    userData
      .save()
      .then((newUserData) => {
        console.log("Create success");
        res.status(200).json({
          message: "Create success",
          data: {
            post: newUserData,
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

export const likeGet = async (req: Request, res: Response): Promise<void> => {
  try {
    res.send("라이크겟");
  } catch (err) {
    res.end();
  }
};
