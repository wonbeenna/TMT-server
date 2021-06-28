import { User } from "./user";

export interface TourSpot {
  id: number;
  user_id: User;
  spot: string;
  day: string;
}
