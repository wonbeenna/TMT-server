import tourSpotModel from "database/tourSpot";
import { Request, Response } from "express";
import { verifyAccessToken } from "@tokenController/index";

export const insertSpot = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userInfo = await verifyAccessToken(req);
    if (!userInfo) {
      res.status(400).send({ message: "access token err" });
    } else {
      const { place, startDate, endDate } = req.body;
      const user = await tourSpotModel.findOne({
        email: (<any>userInfo).email,
      });
      if (user) {
        await tourSpotModel.deleteMany({
          email: (<any>userInfo).email,
        });
      }
      let tourSpot = new tourSpotModel();
      tourSpot.email = (<any>userInfo).email;
      tourSpot.spot = place;
      tourSpot.startDate = startDate;
      tourSpot.endDate = endDate;

      tourSpot
        .save()
        .then((newTourSpot) => {
          console.log("Create success");
          res.status(200).json({
            message: "Create success",
            data: {
              post: newTourSpot,
            },
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: err,
          });
        });
    }
  } catch (err) {
    res.end();
  }
};
