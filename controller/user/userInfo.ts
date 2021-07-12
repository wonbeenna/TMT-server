import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import userModel from "../../database/user";
import { verifyAccessToken } from "@tokenController/index";

export const userInfoPost = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userInfo = await verifyAccessToken(req);
    if (!(<any>userInfo).email) {
      return res
        .status(409)
        .send({ message: "유효하지 않은 access token 입니다." });
    } else {
      const { newPw, originalPw } = req.body;
      const realPw = await userModel.findOne({
        email: (<any>userInfo).email,
      });

      const isMatched: boolean = await bcryptjs.compare(
        originalPw,
        realPw!.password
      );
      if (!isMatched) {
        res.status(405).send({
          message: "현재 비밀번호가 일치하지 않습니다. 다시 입력해주세요.",
        });
      }
      const newPassword = await bcryptjs.hash(newPw, 10);
      await userModel.findOneAndUpdate(
        {
          email: (<any>userInfo).email,
        },
        { password: newPassword },
        { new: true }
      );

      res.status(200).send({
        message: "비밀번호가 성공적으로 수정되었습니다.",
      });
    }
  } catch (err) {
    return err;
  }
};

export const userInfoGet = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userInfo = await verifyAccessToken(req);
    if (!(<any>userInfo).email) {
      return res
        .status(409)
        .send({ message: "유효하지 않은 access token 입니다." });
    } else {
      userModel.findOne({ email: (<any>userInfo).email }).then((theUser) => {
        return res.status(200).send({
          name: (<any>theUser)?.name,
          email: (<any>theUser)?.email,
        });
      });
    }
  } catch (err) {
    return err;
  }
};
