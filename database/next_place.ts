import { model, Schema, Document } from "mongoose";
import { Next_Place } from "@interface";
/*
const placeSchema = new Schema<aa>({
  place: {
    type: String,
  },
  like: {
    type: Number,
  },
});
*/
const nextPlaceSchema = new Schema<Next_Place>({
  place_name: {
    type: String,
  },
  next_place: [{ type: Object }],
});

const nextPlaceModel = model<Next_Place & Document>(
  "next_place",
  nextPlaceSchema
);

export default nextPlaceModel;
//  id     next   count
//경복궁 - 덕수궁     2
//경복궁 - 해운대     1
//경복궁 - 광안리     1

//다른 사용자들이 이 장소에서 다음장소로 어디를 많이 선택하는지. next_place
//다양한 사용자들이 이 장소를 얼마나 좋아하는지. = like

/*

place_id : 경복궁
next_place : [
  [덕수궁,2],
  [해운대,1],
  [광안리,1],
  ...  
]

*/
