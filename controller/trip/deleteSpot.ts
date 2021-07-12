import nextPlaceModel from "database/next_place";
import { Request, Response } from "express";

export const deleteSpot = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { place_name, next_place } = req.body;
    let nextPlace = new nextPlaceModel();
    nextPlace.place_name = place_name;
    nextPlace.next_place = next_place;
    nextPlace
      .save()
      .then((newNextPlace) => {
        console.log("Create success");
        res.status(200).json({
          message: "Create success",
          data: {
            post: newNextPlace,
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
