import placeModel from "database/place";
import { Request, Response } from "express";

export const recommend = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, next_place_name, like } = req.body;
    let place = new placeModel();
    place.name = name;
    place.next_place_name = next_place_name;
    place.like = like;
    place
      .save()
      .then((newPlace) => {
        console.log("Create success");
        res.status(200).json({
          message: "Create success",
          data: {
            post: newPlace,
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
