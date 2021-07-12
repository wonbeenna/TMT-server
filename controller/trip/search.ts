import { Request, Response } from "express";
import dbModel from "database/db";
import elasticsearch from "elasticsearch";
import { Collection } from "mongoose";
// const MongoClient = require("mongodb").MongoClient;
// const River = require("mongo-river-elastic");

export const searchGet = async (req: Request, res: Response): Promise<any> => {
  try {
    const lists = await dbModel.find((err: Error, data: any) => {
      if (err) {
        res.status(500).send(err);
      }
      data.forEach((el: any) => {
        let list = [];
        list.push(el);
      });
    });
    let placeOnly = lists.map((el) => {
      return { place: el.place };
    });
    return res.status(200).send({
      placeOnly,
    });
  } catch (err) {
    return err;
  }
};

export const searchPost = async (req: Request, res: Response): Promise<any> => {
  /*
    ** (엘라스틱 서치 적용 전) 기본 기능 구현!
    1. 클라이언트에서 입력한 인풋값을 받아온다
    2. 데이터베이스의 dbs에서 해당값과 일치하는 place를 찾는다
    3. 일치하는 place를 찾으면 해당 장소의 정보를 클라이언트에 넘겨준다
     */
  // MongoClient.connect(
  //   "localhost:27017",
  //   function (err: any, mongoClient: { db: (arg0: string) => any }) {
  //     const _mongo_db_ref = mongoClient.db("myFirstDatabase");

  //     const _es_ref = new elasticsearch.Client({ host: "localhost:9200" });

  //     const _collection_index_dict = {
  //       dbs: { index: "searchPlace", type: "PLACE", primaryKeyField: "_id" },
  //     };

  //     let river = new River(_mongo_db_ref, _es_ref, _collection_index_dict);
  //   }
  // );
  try {
    const { inputElement } = req.body;

    const spot = await dbModel.findOne({ place: inputElement });
    if (spot) {
      return res.status(200).send({
        place: spot.place,
        address: spot.address,
        lat: spot.lat,
        long: spot.long,
        photo: spot.photo,
      });
    } else {
      return res.status(404).send({
        message: "검색 결과가 존재하지 않습니다.",
      });
    }
  } catch (err) {
    return err;
  }
};
