import tourSpotModel from "database/tourSpot";
import nextPlaceModel from "database/next_place";
import { Request, Response } from "express";
import { verifyAccessToken } from "@tokenController/index";

export const insertSpot = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userInfo = await verifyAccessToken(req);
    if (!userInfo) {
      res.status(400).send({ message: "access token err" });
    } else {
      const { place, startDate, endDate } = req.body;
      const user = await tourSpotModel.findOne({
        email: (<any>userInfo).email,
      });
      if (user) {
        await tourSpotModel.deleteMany({
          email: (<any>userInfo).email,
        });
      }
      let tourSpot = new tourSpotModel();
      tourSpot.email = (<any>userInfo).email;
      tourSpot.spot = place;
      tourSpot.startDate = startDate;
      tourSpot.endDate = endDate;
      tourSpot
        .save()
        .then((newTourSpot) => {
          const spot = (<any>newTourSpot).spot;
          let spots = [];

          const addNextPlace = async (
            spot: string,
            nextSpot: string
          ): Promise<void> => {
            const placeName = await nextPlaceModel.findOne({
              place_name: spot,
            });
            if (!placeName) {
              interface Next_Place {
                [nextSpot: string]: Number;
              }
              var push: Next_Place = {};
              push[nextSpot] = 1;

              const newPlaceName = new nextPlaceModel({
                place_name: spot,
                next_place: push,
              });

              newPlaceName.save();
            }

            await nextPlaceModel.updateOne({});
          };

          for (let i = 0; i < spot.length - 2; i++) {
            spots.push(spot[i][0].place);
            addNextPlace(spot[i][0].place, spot[i + 1][0].place);
          }

          res.status(200).json({
            message: "Create success",
            data: {
              post: newTourSpot,
            },
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: err,
          });
        });
    }
  } catch (err) {
    res.end();
  }
};
