import { Request, Response } from "express";
import userModel from "database/user";
import userDataModel from "database/userData";
import tourSpotModel from "database/tourSpot";
import { verifyAccessToken } from "@tokenController/index";
/*
1. 사용자가 회원 탈퇴 버튼을 눌렀을 경우, 토큰을 넘겨 받는다.
2. 넘겨받은 토큰을 활용해 user, userData, tourSpot 내 해당 유저의 정보를 다 삭제한다.

 */

export const withdrawal = async (req: Request, res: Response): Promise<any> => {
  try {
    const userInfo = await verifyAccessToken(req);

    res.send("탈퇴");
  } catch (err) {
    res.end();
  }
};
