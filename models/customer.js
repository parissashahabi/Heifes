// import mongoose from 'mongoose';
var mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
    {
        name: { type: String },
        isAdmin: { type: Boolean, required: true, default: false },
        city: { type: Number, required: true },
        balance: { type: Number, required: true, default: 0 },
        phoneNumber: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);
const customerModel = mongoose.models.Customer;
const Customer = customerModel || mongoose.model('Customer', customerSchema);
export default Customer;