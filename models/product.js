// import mongoose from 'mongoose';
var mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        category: {
            name: {type: String, required: true},
            id: {type: Number, required: true}
        },
        image: { type: String, required: true },
        description: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);
const productModel = mongoose.models.Product;
const Product = productModel || mongoose.model('Product', productSchema);
export default Product;