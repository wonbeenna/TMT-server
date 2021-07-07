import { Request, Response } from "express";

export const googleLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.status(200).send("구귤구귤");
  } catch (err) {
    return err;
  }
};
