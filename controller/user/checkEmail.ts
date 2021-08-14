import { Request, Response } from "express";
import userModel from "../../database/user";

export const checkEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body;

    const userInfo = await userModel.findOne({
      email: email,
    });

    if (!userInfo) {
      res.status(409).send({ message: "가입 정보가 없습니다." });
    } else {
      res.status(200).send({ message: `${email}은 가입된 이메일 입니다.` });
    }
  } catch (err) {
    console.log(err);
  }
};
