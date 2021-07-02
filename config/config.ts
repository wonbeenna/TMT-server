import dotenv from "dotenv";

dotenv.config();

const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

const MONGO = {
  userName: MONGO_USERNAME,
  password: MONGO_PASSWORD,
  host: MONGO_HOST,
  url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`,
  options: MONGO_OPTIONS,
  token: {
    accessSecret: ACCESS_SECRET,
    refreshSecret: REFRESH_SECRET,
  },
};

export default MONGO;
