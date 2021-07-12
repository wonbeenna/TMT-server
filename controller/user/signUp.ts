import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import userModel from "../../database/user";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    let userInfo = await userModel.findOne({
      email: email,
    });
    if (userInfo) {
      res.status(409).send({
        message: "이미 사용중인 email입니다!",
      });
    } else {
      if (!password.length || !name.length || !email.length) {
        res.status(404).send({ message: "빈 칸을 모두 채워주세요." });
      }
      await bcryptjs.hash(password, 10, (err, hash) => {
        if (err) {
          return res.status(401).send({
            message: "Error has occured",
            error: err,
          });
        } else {
          let user = new userModel({
            name,
            email,
            password: hash,
          });
          // 유저 데이터를 newUserDataModel 만들기 && save 시키기  => 유저테이블도 같이 생성
          return user
            .save()
            .then((newUser) => {
              return res.status(201).send({
                message: "회원가입이 성공적으로 완료되었습니다!",
                name: newUser.name,
                email: newUser.email,
                password: newUser.password,
              });
            })
            .catch((err) => {
              res.status(500).json({
                message: err,
              });
            });
        }
      });
    }
  } catch (err) {
    res.end();
  }
};
