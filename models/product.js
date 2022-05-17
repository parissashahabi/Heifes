import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        productionDate: { type: String, required: true },
        expiryDate: { type: String, required: true },
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

const Product =
    mongoose?.models?.Product || mongoose.model('Product', productSchema);
export default Product;