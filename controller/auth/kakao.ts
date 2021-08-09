import { Request, Response } from "express";

export const kakaoLogin = async (req: Request, res: Response): Promise<any> => {
  try {
    return res.send("카카오");
    // 인가코드 -> 토큰 -> 정보요청
  } catch (err) {
    return err;
  }
};
