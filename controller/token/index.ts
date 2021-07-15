import { sign, verify } from "jsonwebtoken";
import { Request, Response } from "express";
import MONGO from "../../config/config";
import userModel from "../../database/user";
import { User } from "../../interfaces/user";
import { NonUser } from "../../interfaces/nonUser";

// 로그인 시 엑세스 토큰과 리프레시토큰 부여

export const generateAccessToken = (user: User) => {
  return sign({ email: user.email }, MONGO.token.accessSecret!, {
    algorithm: "HS256",
    expiresIn: "2h",
  });
};

export const generateRefreshToken = (user: User) => {
  return sign({ email: user.email }, MONGO.token.refreshSecret!, {
    algorithm: "HS256",
    expiresIn: "14d",
  });
};

export const nonUserAccessToken = (nonUser: NonUser) => {
  return sign({ email: nonUser.email }, MONGO.token.accessSecret!, {
    algorithm: "HS256",
    expiresIn: "2h",
  });
};

export const nonUserRefreshToken = (nonUser: NonUser) => {
  return sign({ email: nonUser.email }, MONGO.token.refreshSecret!, {
    algorithm: "HS256",
    expiresIn: "14d",
  });
};

// 다른 페이지 이동이나 수정 시 엑세스 토큰 유효 여부 확인

export const verifyAccessToken = (req: Request) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    return "not authorized";
  }
  const token = authorization.split(" ")[1];
  try {
    return verify(token, MONGO.token.accessSecret!);
  } catch (err) {
    return err;
  }
};

// 액세스 토큰 만료 시, 리프레쉬 토큰 확인

// export const verifyRefreshToken = (refreshToken: string) => {
//   try {
//     return verify(refreshToken, MONGO.token.refreshSecret!);
//   } catch (err) {
//     return "유효하지 않은 리프레쉬 토큰입니다.";
//   }
// };

export const verifyRefreshToken = (req: Request) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    return "유효하지 않은 리프레쉬 토큰입니다.";
  }
  const token = authorization.split(" ")[1];
  try {
    return verify(token, MONGO.token.refreshSecret!);
  } catch (err) {
    return err;
  }
};
