import { mongoManager } from "../../../db/mongoManager.js";
import { Schema } from "mongoose";

const schema = new Schema({
  username: { type: String, required: true, max: 70, unique: true  },
  email: { type: String, required: true, max: 254, unique: true },
  password: { type: String, required: true },
});

export class UserMongo extends mongoManager {
  constructor() {
    super(process.env.MONGOURL, "users", schema);
  }
}
