/**
 * github
 * phihungvohoang
 * L0KCZhQU7xAjQsY4
 */

import { MongoClient, ServerApiVersion } from "mongodb";
import { env } from "~/config/environment";

let soTayDBInstance = null;
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
//ket noi db
export const CONNECT_DB = async () => {
  //goi ket noi toi URI
  await mongoClientInstance.connect();
  //ket noi thanh cong thi ket noi toi DATABASE_NAME da khai bao
  soTayDBInstance = mongoClientInstance.db(env.DATABASE_NAME);
};
export const GET_DB = () => {
  if (!mongoClientInstance) throw new Error("Must connect to db first");
  return soTayDBInstance;
};
