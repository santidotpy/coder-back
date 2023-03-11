import { mongoManager } from "../../../db/mongoManager";

const schema = {
  name: { type: String, required: true, max: 50 },
  email: { type: String, required: true, max: 50 },
  message: { type: String, required: true, max: 140 },
};

export class MessageMongo extends mongoManager {
  constructor() {
    super(process.env.MONGOURL, "messages", schema);
  }
}
