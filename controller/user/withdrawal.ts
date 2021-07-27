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
    if (!userInfo) {
      return res
        .status(409)
        .send({ message: "유효하지 않은 access token 입니다." });
    } else {
      // user 콜렉션에서 해당 유저의 정보를 찾아 삭제
      /* 
      - findOneAndDelete 와 findOneAndRemove의 차이점: 
      -> findOneAndRemove는 findOneAndModify와 같은 역할을 함
      -> findIneAndDelete가 더 적합
      */

      await userModel.findOneAndDelete({
        email: (<any>userInfo).email,
      });

      await userDataModel.findOneAndDelete({
        email: (<any>userInfo).email,
      });
      await tourSpotModel.findOneAndDelete({
        email: (<any>userInfo).email,
      });

      res.status(200).send({
        message: "탈퇴가 성공적으로 완료되었습니다.",
      });
    }
  } catch (err) {
    res.send({
      "error message": err,
    });
  }
};
