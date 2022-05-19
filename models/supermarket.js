// import mongoose from 'mongoose';
var mongoose = require('mongoose');

const supermarketSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        city: { type: Number, required: true },
        address: { type: String, required: true },
        phoneNumber: { type: String, required: true, unique: true },
        nationalId: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        ranking: { type: Number, required: true },
        status: { type: String, required: true }
    },
    {
        timestamps: true,
    }
);
const supermarketModel = mongoose.models.Supermarket;
const Supermarket = supermarketModel || mongoose.model('Supermarket', supermarketSchema);
export default Supermarket;