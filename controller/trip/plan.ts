import { Request, Response } from "express";
import { verifyAccessToken } from "@tokenController/index";
import planModel from "database/plan";

export const planPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const userInfo = await verifyAccessToken(req);
    if (!userInfo) {
      res.status(400).send({ message: "access token err" });
    } else {
      const { place } = req.body;

      let planList = new planModel();
      planList.name = (<any>userInfo).name;
      planList.email = (<any>userInfo).email;
      planList.spot = place;
      planList
        .save()
        .then((newPlanList) => {
          res.status(200).send({
            message: "경로가 저장되었습니다. 공유페이지에서 확인해보세요!",
          });
        })
        .catch((err) => {
          res.status(400).send({ message: "에러에러" });
        });
    }
  } catch (err) {
    res.send(err);
  }
};

export const planGet = async (req: Request, res: Response): Promise<void> => {
  try {
    const planList = await planModel.find((err: Error, data: any) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send({ data });
    });
  } catch (err) {
    return err;
  }
};
