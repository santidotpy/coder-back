import { mongoManager } from "../../../db/mongoManager";


const url = "";
const schema = {
    name: { type: String, required: true, max: 50 },
    email: { type: String, required: true, max: 50 },
    message: { type: String, required: true, max: 140 }
}


export class Message extends mongoManager {
    constructor() {
        super(url, "messages", schema);
    }
}