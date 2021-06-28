import { Place } from "./place";

export interface NextPlace {
  name: string;
  choice: number;
}

export interface Next_Place {
  id: number;
  place_id: Place;
  next_place: NextPlace[];
}
