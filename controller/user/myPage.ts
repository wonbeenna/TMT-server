import { Request, Response } from "express";
import { verifyAccessToken } from "@tokenController/index";
import tourSpotModel from "database/tourSpot";

export const myPage = async (req: Request, res: Response): Promise<void> => {
  try {
    const userInfo = await verifyAccessToken(req);
    if (!userInfo) {
      res.status(400).send({ message: "access token err" });
    } else {
      const userSpot = await tourSpotModel
        .findOne({
          email: <any>userInfo.email,
        })
        .select("-_id spot startDate endDate");
      /*
      const placeList = await dbModel
        .find({
          place: { $in: (<any>userSpot).spot },
        })
        .select("-_id place address lat long photo theme");
        */
      console.log("userSpot : ", userSpot);
      res.status(200).json(userSpot);
    }
  } catch (err) {
    res.end();
  }
};
