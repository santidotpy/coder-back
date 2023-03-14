import { mongoManager } from "../../../db/mongoManager";
import { Schema } from "mongoose";

const schema = new Schema({
  name: { type: String, required: true, max: 70 },
  email: { type: String, required: true, max: 254, unique: true },
  message: { type: String, required: true, max: 280 },
});

export class MessageMongo extends mongoManager {
  constructor() {
    super(process.env.MONGOURL, "messages", schema);
  }
}
