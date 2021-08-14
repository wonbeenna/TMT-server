import { Request, Response } from "express";
import userModel from "../../database/user";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

export const checkPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body;

    const userInfo = await userModel.findOne({
      email: email,
    });

    if (userInfo) {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        host: `${process.env.EMAIL_HOST}`,
        secure: true,
        auth: {
          user: `${process.env.EMAIL_USER}`,
          pass: `${process.env.EMAIL_PASS}`,
        },
      });

      const randomPassword = "tmt" + Math.floor(Math.random() * 10000000) + "!";
      const newPassword = await bcryptjs.hash(randomPassword, 10);

      await userModel.findOneAndUpdate(
        {
          email: (<any>userInfo).email,
        },
        { password: newPassword },
        { new: true }
      );

      let info = await transporter.sendMail({
        from: `"TMT Team" <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: "TMT Team",
        html:
          "        <h1>" +
          `            임시 비밀번호 : ${randomPassword} 입니다.` +
          "</br>" +
          "<h3>로그인 후 비밀번호를 변경해 주세요.</h3>" +
          "</h1>",
      });

      res.status(200).send({
        message: "임시 비밀번호가 이메일로 전송되었습니다.",
      });
    } else {
      res.status(405).send({ message: "가입 정보가 없습니다." });
    }
  } catch (err) {
    console.log(err);
  }
};
