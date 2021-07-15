import { Request, Response } from "express";
import nonUserModel from "../../database/nonUser";
import {
  nonUserAccessToken,
  nonUserRefreshToken,
} from "../../controller/token/index";

export const nonUser = async (req: Request, res: Response): Promise<void> => {
  /*
    1. 클라이언트로부터 비회원 로그인 요청을 받게 되면, 이메일과 비번을 랜덤으로 만들어서 + 엑세스토큰 & 리프레쉬 토큰 디비에 저장 후 클라에 보내준다
    2. 디비에 저장된 비회원 아이디들을 생성 기간을 기준으로 24시간이 지나면 삭제되어야 함
    
     */
  try {
    let randomInfo = await new nonUserModel({
      email: Math.random(),
      password: Math.random(),
    });

    return randomInfo
      .save()
      .then((newRandom) => {
        console.log("누구?: ", newRandom);

        const accessToken = nonUserAccessToken(newRandom);
        const refreshToken = nonUserRefreshToken(newRandom);
        res.status(200).send({
          message: "비회원로그인에 성공하였습니다!",
          accessToken: accessToken,
          refreshToken: refreshToken,
          email: newRandom.email,
          password: newRandom.password,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "something went wrong...",
          error: err,
        });
      });
  } catch (err) {
    res.end();
  }
};
