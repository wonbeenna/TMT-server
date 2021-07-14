import userDataModel from "database/userData";
import placeModel from "database/place";
import { Request, Response } from "express";
import { verifyAccessToken } from "@tokenController/index";

export const likePost = async (req: Request, res: Response): Promise<any> => {
  try {
    const userInfo = await verifyAccessToken(req);
    if (!userInfo) {
      res.status(400).send({ message: "access token err" });
    } else {
      const { place } = req.body;
      await userDataModel.updateOne(
        {
          email: (<any>userInfo).email,
        },
        {
          $addToSet: { place: place },
        }
      );
      const placeData = await placeModel.findOne({
        name: place,
      });
      if (!placeData) {
        const newPlace = new placeModel();
        newPlace.name = place;
        newPlace.next_place_name = [];
        newPlace.like = 1;
        newPlace
          .save()
          .then((newPlace) => {
            console.log("Create success");
            res.status(200).json({
              message: "Create success",
              data: {
                post: newPlace,
              },
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: err,
            });
          });
      }
      await placeModel.updateOne(
        {
          name: place,
        },
        {
          $set: { like: (<any>placeData).like + 1 },
        }
      );
      // console.log("placeData.like: ", (<any>placeData).like);
      res.status(200).json({ place: place });
    }
  } catch (err) {
    res.json(err);
  }
};

export const likeGet = async (req: Request, res: Response): Promise<void> => {
  try {
    const userInfo = await verifyAccessToken(req);
    if (!userInfo) {
      res.status(400).send({ message: "access token err" });
    } else {
      const user = await userDataModel.findOne({
        email: (<any>userInfo).email,
      });
      console.log(user?.place);
      res.status(200).json({ place: user?.place });
    }
  } catch (err) {
    res.end();
  }
};

export const likeDelete = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userInfo = await verifyAccessToken(req);
    if (!userInfo) {
      res.status(400).send({ message: "access token err" });
    } else {
      const { place } = req.body;
      await userDataModel.updateOne(
        {
          email: (<any>userInfo).email,
        },
        {
          $pull: { place: place },
        }
      );
      const placeData = await placeModel.findOne({
        name: place,
      });
      await placeModel.updateOne(
        {
          name: place,
        },
        {
          $set: { like: (<any>placeData).like - 1 },
        }
      );
      res.status(200).json({ place: place });
    }
  } catch (err) {
    res.end();
  }
};
