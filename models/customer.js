// import mongoose from 'mongoose';
var mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        city: { type: Number, required: true },
        balance: { type: Number, required: true },
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