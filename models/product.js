// import mongoose from 'mongoose';
var mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        productionDate: { type: Date, required: true },
        expiryDate: { type: Date, required: true },
        discountPercentage: { type: Number, required: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        oldPrice: { type: Number, required: true },
        countInStock: { type: Number, required: true, default: 0 },
        description: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);
const productModel = mongoose.models.Product;
const Product = productModel || mongoose.model('Product', productSchema);
export default Product;