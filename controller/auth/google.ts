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
import userDataModel from "database/userData";
dotenv.config();

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

  const payload = user.getPayload();
  try {
    if (payload?.email_verified) {
      const findingUser = await userModel.findOne({ email: payload.email });

      if (findingUser) {
        const accessToken = generateAccessToken(findingUser);
        const refreshToken = generateRefreshToken(findingUser);
        userModel
          .findOne({
            name: (<any>findingUser).name,
            email: (<any>findingUser).email,
          })
          .then((theUser) => {
            res.status(200).send({
              name: (<any>theUser)?.name,
              email: (<any>theUser)?.email,
              accessToken: accessToken,
              refreshToken: refreshToken,
              message: "로그인에 성공하였습니다!",
            });
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
    } else {
      return res.status(404).send({
        message: "다시 시도해주세요.",
      });
    }
  } catch (err) {
    return err;
  }
};
