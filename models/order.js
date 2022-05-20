// import mongoose from 'mongoose';
var mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
        orderItems: [
            {
                name: { type: String, required: true },
                productionDate: { type: Date, required: true },
                expiryDate: { type: Date, required: true },
                category: { type: String, required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
            },
        ],
        itemsPrice: { type: Number, required: true },
        taxPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        isTaken: { type: Boolean, required: true, default: false },
        trackingCode: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);
const orderModel = mongoose.models.Order;
const Order = orderModel || mongoose.model('Order', orderSchema);
export default Order;