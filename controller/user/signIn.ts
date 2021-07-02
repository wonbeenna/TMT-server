import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import userModel from "../../database/user";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../controller/tokenFunctions/index";
import dotenv from "dotenv";

dotenv.config();

/* Todo
1. 데이터베이스에 이메일이 존재하는지 여부 확인 (비밀번호는 암호화되어서 저장되어 있기에 따로 처리 필요)
2. 존재하지 않을 시 "존재하지 않는 이메일입니다" 메시지 날려주기
3. 존재할 경우, 비밀번호 매칭 확인 => bcrypt의 compare 메소드 사용
3-1. bycrptjs.compare(요청 온 비밀번호, 데이터베이스 내 비밀번호)
4. 로그인 시, 엑세스, 리프레쉬 토큰 건내주기!!
*/

export const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    let userInfo = await userModel.findOne({
      email: email,
    });
    if (!userInfo) {
      res.status(409).send({
        message: "존재하지 않는 이메일입니다.",
      });
    } else {
      const isMatched: boolean = await bcryptjs.compare(
        password,
        userInfo.password
      );
      if (!isMatched) {
        res.status(409).send({
          message: "비밀번호가 일치하지 않습니다.",
        });
      } else {
        const accessToken = generateAccessToken(userInfo);
        const refreshToken = generateRefreshToken(userInfo);
        res.status(200).send({
          accessToken: accessToken,
          refreshToken: refreshToken,
          message: "로그인에 성공하였습니다!",
        });
      }
    }
  } catch (err) {
    res.end();
  }
};
