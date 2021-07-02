import { Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import MONGO from "../../config/config";
import userModel from "../../database/user";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../../controller/tokenFunctions/index";
import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";

/*
회원정보 get 요청 시, 
1. 엑세스 토큰 유효성 검사
1-1. 유효할 경우, 요청하는 정보 보내주기
1-2. 유효하지 않은 경우, refreshToken 확인 후 accessToken 재발급

 */

export const userInfoPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
  } catch (err) {
    res.end();
  }
};

export const userInfoGet = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // const { name, email } = req.body;
    const userInfo = await verifyAccessToken(req);
    console.log("유저인포:", userInfo);
    if (!userInfo) {
      res.status(409).send({ message: "유효하지 않은 access token 입니다." });
    } else {
      userModel.findOne({ userInfo }).then((theUser) => {
        console.log("더유저: ", theUser);
        return res.status(200).send({
          name: theUser?.name,
          email: theUser?.email,
        });
      });
    }
  } catch (err) {
    res.end();
  }
};
