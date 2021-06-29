import dbModel from "database/db";
import { Request, Response } from "express";

export const listPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { place, theme, province, address, lat, long, photo } = req.body;
    let db = new dbModel();
    db.place = place;
    db.theme = theme;
    db.province = province;
    db.address = address;
    db.lat = lat;
    db.long = long;
    db.photo = photo;
    db.save()
      .then((newDb) => {
        console.log("Create success");
        res.status(200).json({
          message: "Create success",
          data: {
            post: newDb,
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

export const listGet = async (req: Request, res: Response): Promise<void> => {
  try {
    res.send("리스트겟");
  } catch (err) {
    res.end();
  }
};
