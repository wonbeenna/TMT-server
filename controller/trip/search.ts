import { Request, Response } from "express";
import dbModel from "database/db";
import elasticsearch from "elasticsearch";
import { Collection } from "mongoose";

export const searchGet = async (req: Request, res: Response): Promise<any> => {
  try {
    const lists = await dbModel.find((err: Error, data: any) => {
      if (err) {
        res.status(500).send(err);
      }
      data.forEach((el: any) => {
        let list = [];
        list.push(el);
      });
    });
    let placeOnly = lists.map((el) => {
      return { place: el.place };
    });
    return res.status(200).send({
      placeOnly,
    });
  } catch (err) {
    return err;
  }
};

export const searchPost = async (req: Request, res: Response): Promise<any> => {
  try {
    const { inputElement } = req.body;

    const spot = await dbModel.findOne({ place: inputElement });
    if (spot) {
      return res.status(200).send({
        place: spot.place,
        address: spot.address,
        lat: spot.lat,
        long: spot.long,
        photo: spot.photo,
      });
    } else {
      return res.status(404).send({
        message: "검색 결과가 존재하지 않습니다.",
      });
    }
  } catch (err) {
    return err;
  }
};
