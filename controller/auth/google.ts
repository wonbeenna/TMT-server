import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import userModel from "../../database/user";
import { TokenData } from "@interface";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../controller/token/index";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
import dotenv from "dotenv";
dotenv.config();

/*
  1. 클라이언트로부터 구글 토큰을 받아온다
  2. 받은 토큰을 verify 한다
  2-1. 없을 경우, 아이디와 이름, 이메일+토큰 을 조합한 비밀번호를 적용해 회원가입

   */
export const googleLogin = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { token }: TokenData = req.body;
  const { email, name } = req.body;
  const user = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  console.log("유저: ", user.getPayload());
  const payload = user.getPayload();
  try {
    if (payload?.email_verified) {
      const findingUser = await userModel.findOne({ email: payload.email });
      console.log("파인딩 유저: ", findingUser);
      if (findingUser) {
        const accessToken = generateAccessToken(findingUser);
        const refreshToken = generateRefreshToken(findingUser);
        res.status(200).send({
          accessToken: accessToken,
          refreshToken: refreshToken,
          message: "로그인이 성공적으로 되었습니다!",
        });
      } else {
        const creatingPassword = await bcryptjs.hash(
          payload?.email + process.env.GOOGLE_CLIENT_ID!,
          10
        );
        const newUser = new userModel({
          name: payload.name,
          email: payload.email,
          password: creatingPassword,
        });
        return newUser.save().then((data) => {
          return res.status(201).send({
            message: "회원가입이 성공적으로 완료되었습니다!",
            name: data.name,
            email: data.email,
            password: data.password,
          });
        });
      }
    } else {
      return res.status(404).send({
        message: "다시 시도해주세요.",
      });
    }
  } catch (err) {
    return err;
  }
};
