import { Request, Response } from "express";
import placeModel from "database/place";
import dbModel from "../../database/db";

export const recommend = async (req: Request, res: Response): Promise<void> => {
  try {
    const { place } = req.body;
    const next_place = await placeModel.find({
      name: place,
    });
    if (next_place.length === 0) {
      res.status(400).json({ message: "추천할 장소가 없습니다." });
    } else {
      const placeList = await dbModel
        .find({
          place: { $in: next_place[0].next_place_name },
        })
        .select("-_id place address lat long photo theme");
      console.log(placeList);
      res.status(200).json(placeList);
    }
  } catch (err) {
    res.end();
  }
};
