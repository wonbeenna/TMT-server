import { Request, Response } from "express";
import dbModel from "database/db";
export const dbPost = async (req: Request, res: Response): Promise<any> => {
  try {
    const { theme, place, province, address, lat, long, photo } = req.body;
    let placeInfo = await dbModel.findOne({
      place: place,
    });
    if (placeInfo) {
      res.status(409).send({
        message: "이미 저장되어있는 정보입니당!",
      });
    } else {
      let savingInfo = new dbModel({
        theme,
        place,
        province,
        address,
        lat,
        long,
        photo,
      });

      return savingInfo
        .save()
        .then((newInfo) => {
          return res.status(201).send({
            message: "데이터 저장이 성공적으로 완료되었습니다!",
            theme: newInfo.theme,
            place: newInfo.place,
            province: newInfo.province,
            address: newInfo.address,
            lat: newInfo.lat,
            long: newInfo.long,
            photo: newInfo.photo,
          });
        })

        .catch((err) => {
          res.status(500).json({
            message: err,
          });
        });
    }
  } catch (err) {
    return err;
  }
};
