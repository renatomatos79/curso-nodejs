import * as mongoose from "mongoose";
// https://mongoosejs.com/docs/schematypes.html

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    name: {
        type: String
    }
});

export const ProductModel = mongoose.model("products", productSchema);