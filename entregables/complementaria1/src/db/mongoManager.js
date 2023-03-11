import { mongoose } from "mongoose";

export class mongoManager {
  #url; // private property
  constructor(url, collection, schema) {
    this.#url = url;
    this.collection = collection;
    this.schema = new mongoose.Schema(schema);
    this.model = mongoose.model(collection, this.schema);
  }

  async #connect() {
    try {
      await mongoose.connect(this.url);
      console.log("MongoDB connected");
    } catch (error) {
      console.log("Something went wrong during connection", error);
    }
  }

  // async disconnect() {
  //     try {
  //         await mongoose.disconnect();
  //         console.log("MongoDB disconnected");
  //     } catch (error) {
  //         console.log('Something went wrong during disconnection', error);
  //     }
  // }

  async getElements() {
    this.#connect();
    try {
      return await this.model.find();
    } catch (error) {
      console.log("Something went wrong ", error);
    }
  }

  async getElementById(id) {
    this.#connect();
    try {
      return await this.model.findById(id);
    } catch (error) {
      console.log(`Something went wrong with element ${id}`, error);
    }
  }

  // async addElement(data) {
  // try {
  //     return await this.model.insertOne(data);
  // } catch (error) {
  //     console.log(`Something went wrong adding element`, error);
  // }
  // }

  // agrego 1 o varios elementos
  async addElements(data) {
    this.#connect();
    try {
      return await this.model.insertMany(data);
    } catch (error) {
      console.log(`Something went wrong adding elements`, error);
    }
  }

  async updateElement(id, data) {
    this.#connect();
    try {
      return await this.model.findByIdAndUpdate(id, data);
    } catch (error) {
      console.log(`Something went wrong updating element ${id}`, error);
    }
  }

  async deleteElement(id) {
    this.#connect();
    try {
      return await this.model.findByIdAndRemove(id);
    } catch (error) {
      console.log(`Something went wrong deleting element ${id}`, error);
    }
  }
}
