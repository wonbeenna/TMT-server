import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import userModel from "../../database/user";
import userDataModel from "database/userData";
import { TokenData } from "@interface";
import dotenv from "dotenv";
import axios from "axios";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../controller/token/index";
dotenv.config();

export const kakaoLogin = async (req: Request, res: Response): Promise<any> => {
  const { kakaoToken } = req.body;
  const kakaoURL = `https://kapi.kakao.com/v2/user/me`;
  if (!kakaoToken) {
    return res.status(401).send({ message: "다시 시도해 주세요" });
  }
  let userData: any;
  await axios
    .get(kakaoURL, {
      headers: {
        Authorization: `Bearer ${kakaoToken}`,
      },
    })
    .then(async (res) => {
      userData = res;
    });

  try {
    const findUser = await userModel.findOne({
      email: userData.data.kakao_account.email,
    });

    if (findUser) {
      const accessToken = generateAccessToken(findUser);
      const refreshToken = generateRefreshToken(findUser);
      return res.status(200).send({
        accessToken: accessToken,
        refreshToken: refreshToken,
        message: "로그인이 성공적으로 되었습니다!",
      });
    } else {
      const creatingPassword = await bcryptjs.hash(
        userData.data.kakao_account.email + process.env.GOOGLE_CLIENT_ID!,
        10
      );
      const newUser = new userModel({
        name: userData.data.properties.nickname,
        email: userData.data.kakao_account.email,
        password: creatingPassword,
      });
      return newUser.save().then(async (data) => {
        let userData = new userDataModel({
          email: data.email,
          place: [],
        });
        const newFindingUser = await userModel.findOne({ email: data.email });
        if (newFindingUser) {
          const accessToken = generateAccessToken(newFindingUser);
          const refreshToken = generateRefreshToken(newFindingUser);
          return userData.save().then(() => {
            return res.status(201).send({
              message: "회원가입이 성공적으로 완료되었습니다!",
              name: data.name,
              email: data.email,
              password: data.password,
              accessToken: accessToken,
              refreshToken: refreshToken,
            });
          });
        }
      });
    }
  } catch (err) {
    return res.send("카카오 에러");
  }
};

/* ----------------------------Version 2---------------------------------------------

import { Request, Response } from "express";
import axios from "axios";
import userModel from "../../database/user";
import userDataModel from "../../database/userData";
import bcryptjs from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../controller/token/index";


1. 클라이언트로부터 엑세스토큰을 넘겨 받는다. (req.body)
2. 엑세스 토큰으로 카카오에 정보 요청: 유저의 이메일 정보, 이름을 뽑아와 회원가입 시킴 (비번은 이메일과 닉네임 합친 것을 암호화 시킴)
3. userData 도 함께 생성
 
export const kakaoLogin = async (req: Request, res: Response): Promise<any> => {
  try {
    const { kakaoToken } = req.body;
    let userInfo = await axios
      .get("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: `Bearer ${kakaoToken}`,
        },
      })
      .then((res) => {
        return {
          email: res.data.kakao_account.email,
          nickname: res.data.kakao_account.profile.nickname,
        };
      });
    
    const oldUser = await userModel.findOne({
      email: (<any>userInfo).email,
    });
    if (oldUser) {
      const accessToken = generateAccessToken(oldUser);
      const refreshToken = generateRefreshToken(oldUser);
      res.status(200).send({
        accessToken: accessToken,
        refreshToken: refreshToken,
        message: "카카오로그인에 성공하였습니다!",
      });
    } else {
      const password = (<any>userInfo).email + (<any>userInfo).nickname;
      const creatingPassword = await bcryptjs.hash(password, 10);
      const newUser = new userModel({
        email: (<any>userInfo).email,
        name: (<any>userInfo).nickname,
        password: password,
      });
      return newUser.save().then((kakaoUser) => {
        let userData = new userDataModel({
          email: kakaoUser.email,
          place: [],
        });
        return userData.save().then(() => {
          return res.status(201).send({
            message: "카카오 로그인이 성공적으로 되었습니다!",
            name: kakaoUser.name,
            email: kakaoUser.email,
          });
        });
      });
    }
  } catch (err) {
    return err;
  }
};


 */
