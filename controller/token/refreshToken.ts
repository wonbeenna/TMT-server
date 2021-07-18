import userModel from "../../database/user";
import { Request, Response } from "express";
import {
  generateAccessToken,
  verifyRefreshToken,
} from "../../controller/token/index";

export const refreshToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validateRefreshToken = await verifyRefreshToken(req);
    if (!(<any>validateRefreshToken).email) {
      res
        .status(401)
        .send({ message: "토큰이 만료되었습니다. 다시 로그인을 해주세요." });
    } else {
      const { email }: any = validateRefreshToken;
      const findingUser = userModel
        .findOne({
          email: email,
        })
        .then((data) => {
          const newAccessToken = generateAccessToken(data!);
          res.status(200).send({
            message: "토큰이 재발급 되었습니다!",
            newAccessToken: newAccessToken,
          });
        });
    }
  } catch (err) {
    return err;
  }
};
