import { mongoManager } from "../../../db/mongoManager";

const schema = {
  productName: { type: String, required: true, max: 100 },
  description: { type: String, required: true, max: 5000 },
  code: { type: Number, required: true, unique: true, max: 10 },
  price: { type: Number, required: true },
  thumbnail: { type: String, max: 500 },
  stock: { type: Number, required: true },
};

export class ProductMongo extends mongoManager {
  constructor() {
    super(process.env.MONGOURL, "products", schema);
  }
}
