import { mongoManager } from "../../../db/mongoManager";

const schema = {
  products: { type: Array },
};

export class CartMongo extends mongoManager {
  constructor() {
    super(process.env.MONGOURL, "carts", schema);
  }
}
