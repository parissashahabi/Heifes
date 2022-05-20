// import mongoose from 'mongoose';
var mongoose = require('mongoose');

const supermarketSchema = new mongoose.Schema(
    {
        name: { type: String},
        city: { type: Number, required: true },
        address: { type: String},
        phoneNumber: { type: String, required: true, unique: true },
        nationalId: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        ranking: { type: Number, required: true, default: 0  },
        status: { type: String, required: true, default: "PENDING"},
        workingHours: {
            from: {type: Date},
            to: {type: Date}
        }
    },
    {
        timestamps: true,
    }
);
const supermarketModel = mongoose.models.Supermarket;
const Supermarket = supermarketModel || mongoose.model('Supermarket', supermarketSchema);
export default Supermarket;