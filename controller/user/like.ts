import userDataModel from "database/userData";
import { Request, Response } from "express";
import { verifyAccessToken } from "@tokenController/index";

export const likePost = async (req: Request, res: Response): Promise<any> => {
  try {
    const userInfo = await verifyAccessToken(req);
    if (!userInfo) {
      res.status(400).send({ message: "access token err" });
    } else {
      const { place } = req.body;
      await userDataModel.update(
        {
          email: (<any>userInfo).email,
        },
        {
          $addToSet: { place: place },
        }
      );
      // console.log("place: ", place);
      res.status(200).json({ place: place });
    }
  } catch (err) {
    res.json(err);
  }
};

export const likeGet = async (req: Request, res: Response): Promise<void> => {
  try {
    const userInfo = await verifyAccessToken(req);
    if (!userInfo) {
      res.status(400).send({ message: "access token err" });
    } else {
      const user = await userDataModel.findOne({
        email: (<any>userInfo).email,
      });
      console.log(user?.place);
      res.status(200).json({ place: user?.place });
    }
  } catch (err) {
    res.end();
  }
};
