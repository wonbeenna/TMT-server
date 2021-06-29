import tourSpotModel from "database/tourSpot";
import { Request, Response } from "express";

export const insertSpot = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, spot, day } = req.body;
    let tourSpot = new tourSpotModel();
    tourSpot.email = email;
    tourSpot.spot = spot;
    tourSpot.day = day;
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
  } catch (err) {
    res.end();
  }
};
