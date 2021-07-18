import userDataModel from "database/userData";
import dbModel from "../../database/db";
import { Request, Response } from "express";
import { verifyAccessToken } from "@tokenController/index";

export const photoLike = async (req: Request, res: Response): Promise<void> => {
  try {
    const userInfo = await verifyAccessToken(req);
    if (!userInfo) {
      res.status(400).send({ message: "access token err" });
    } else {
      const user = await userDataModel.findOne({
        email: (<any>userInfo).email,
      });
      const db = await dbModel
        .find({
          place: { $in: (<any>user).place },
        })
        .select("-_id place photo");

      res.status(200).json(db);
    }
  } catch (err) {
    res.end();
  }
};
