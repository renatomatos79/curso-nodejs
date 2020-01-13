import * as mongoose from "mongoose";
// https://mongoosejs.com/docs/schematypes.html

const groupSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    name: {
        type: String
    }
});

export const GroupModel = mongoose.model("groups", groupSchema);