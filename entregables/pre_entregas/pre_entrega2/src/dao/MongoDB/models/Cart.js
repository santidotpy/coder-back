import { mongoManager } from "../../../db/mongoManager.js";

const schema = {
  products: { type: Array },
};

export class CartMongo extends mongoManager {
  constructor() {
    super(process.env.MONGOURL, "carts", schema);
  }
}
