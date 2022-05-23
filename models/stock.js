// import mongoose from 'mongoose';
var mongoose = require('mongoose');

const stockSchema = new mongoose.Schema(
    {
        supermarketId: { type: mongoose.Schema.Types.ObjectId, required: true },
        productId: { type: mongoose.Schema.Types.ObjectId, required: true},
        productionDate: { type: Date, required: true },
        expiryDate: { type: Date, required: true },
        price: { type: Number, required: true },
        oldPrice: { type: Number, required: true },
        countInStock: { type: Number, required: true, default: 0 },
    },
    {
        timestamps: true,
    }
);
const stockModel = mongoose.models.Stock;
const Stock = stockModel || mongoose.model('Stock', stockSchema);
export default Stock;