import { Request, Response } from "express";

export const withdrawal = async (req: Request, res: Response): Promise<any> => {
  try {
    res.send("탈퇴");
  } catch (err) {
    res.end();
  }
};
