import { Request, Response } from "express";
import nextPlaceModel from "database/next_place";

export const signOut = async (req: Request, res: Response): Promise<void> => {
  try {
    const { place_name, next_place, place, like } = req.body;
    const aa = new nextPlaceModel();
    aa.place_name = place_name;
    aa.next_place = next_place;

    aa.save().then(() => {
      res.status(200).json(aa);
    });
  } catch (err) {
    res.end();
  }
};
