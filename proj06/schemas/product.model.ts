import * as mongoose from "mongoose";
// https://mongoosejs.com/docs/schematypes.html

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true, max: 255 }
});

export const ProductModel = mongoose.model("products", productSchema);