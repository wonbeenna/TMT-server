import { Request, Response } from "express";

export const likePost = async (req: Request, res: Response): Promise<void> => {
  try {
    res.send("라이크포스트");
  } catch (err) {
    res.end();
  }
};

export const likeGet = async (req: Request, res: Response): Promise<void> => {
  try {
    res.send("라이크겟");
  } catch (err) {
    res.end();
  }
};
