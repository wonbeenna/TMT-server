import { Request, Response } from "express";
import { verifyAccessToken } from "@tokenController/index";
import planModel from "database/plan";

export const viewGet = async (req: Request, res: Response): Promise<void> => {
  try {
    const params = req.query.match;
    const planList = await planModel.find((err: Error, data: any) => {
      if (err) {
        res.status(500).send(err);
      }
      data.map((el: any) => {
        return el._id;
      });
    });

    let viewData = planList.filter((el: any) => {
      return el._id.toString() === params;
    });
    res.status(200).send({
      viewData,
    });
  } catch (err) {
    return err;
  }
};
