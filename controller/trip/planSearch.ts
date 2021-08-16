import { Request, Response } from "express";
import { verifyAccessToken } from "@tokenController/index";
import planModel from "database/plan";

export const planSearchPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { province, theme } = req.body;

    if (!province) {
      const planList = await planModel.find({
        "spot.theme": { $all: theme },
      });
      if (!planList) {
        res.status(400).send({ message: "req err" });
      } else {
        res.status(200).send({ data: planList });
      }
    } else if (theme.length === 0) {
      const planList = await planModel.find({
        "spot.province": province,
      });
      if (!planList) {
        res.status(400).send({ message: "req err" });
      } else {
        res.status(200).send({ data: planList });
      }
    } else {
      const planList = await planModel.find({
        "spot.theme": { $all: theme },
        "spot.province": province,
      });
      if (!planList) {
        res.status(400).send({ message: "req err" });
      } else {
        res.status(200).send({ data: planList });
      }
    }
  } catch (err) {
    res.send(err);
  }
};
