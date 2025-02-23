import dbModel from "../../database/db";
import { Request, Response } from "express";
import placeModel from "database/place";

export const listPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { province, theme } = req.body;

    if (!province) {
      const placeList = await dbModel
        .find({
          theme: { $all: theme }, //$in과 all의 차이 : in은 theme에 값 중에서 하나라도 존재하면 find. all은 theme에 존재하는 값이 모두있어야 find.
        })
        .select("-_id place address lat long photo theme");
      if (!placeList) {
        res.status(400).json({ message: "request failed!" });
      } else {
        res.status(200).json(placeList);
      }
    } else if (theme.length === 0) {
      const placeList = await dbModel
        .find({
          province: province,
        })
        .select("-_id place address lat long photo theme");
      if (!placeList) {
        res.status(400).json({ message: "request failed!" });
      } else {
        res.status(200).json(placeList);
      }
    } else {
      const placeList = await dbModel
        .find({
          theme: { $all: theme },
          province: province,
        })
        .select("-_id place address lat long photo theme");
      if (!placeList) {
        res.status(400).json({ message: "request failed!" });
      } else {
        res.status(200).json(placeList);
      }
    }
  } catch (err) {
    res.send(err);
  }
};

export const listGet = async (req: Request, res: Response): Promise<void> => {
  try {
    let topPlaceName: any = [];
    const topPlace = await placeModel
      .find()
      .sort({ like: -1 })
      .limit(10)
      .select("-_id name");
    if (topPlace) {
      topPlace.forEach(function (value) {
        topPlaceName.push(value.name);
      });
    }
    const placeList = await dbModel
      .find({
        place: { $in: topPlaceName },
      })
      .select("-_id place address lat long photo theme");
    if (!placeList) {
      res.status(400).json({ message: "request failed!" });
    } else {
      res.status(200).json(placeList);
    }
  } catch (err) {
    res.end();
  }
};
