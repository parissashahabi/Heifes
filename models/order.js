// import mongoose from 'mongoose';
var mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
        supermarketId: { type: mongoose.Schema.Types.ObjectId, required: true },
        orderItems: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, required: true},
                product_details_list: {
                    name: { type: String, required: true },
                    slug: { type: String, required: true, unique: true },
                    category: {
                        name: {type: String, required: true},
                        id: {type: Number, required: true}
                    },
                    image: { type: String, required: true },
                    description: { type: String, required: true },
                },
                productionDate: { type: Date, required: true },
                expiryDate: { type: Date, required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
                isTaken: { type: Boolean, required: true, default: false },

            },
        ],
        itemsPrice: { type: Number, required: true },
        taxPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        isConfirmed: { type: Boolean, required: true, default: false },
        trackingCode: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);
const orderModel = mongoose.models.Order;
const Order = orderModel || mongoose.model('Order', orderSchema);
export default Order;