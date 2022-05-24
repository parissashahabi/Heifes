import nc from 'next-connect';
import Stock from '../../../models/stock';
import db from '../../../utils/db';
import mongoose from "mongoose";

const handler = nc();

handler.post(async (req, res) => {
    await db.connect();
    Stock.aggregate([
        {
            $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "product_details_list",
            },
        },
        {
            $unwind: "$product_details_list",
        },
        {
            $match: {
                productId: mongoose.Types.ObjectId(req.body.productId),
                supermarketId: mongoose.Types.ObjectId(req.body.supermarketId),
            }
        }
    ])
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
        });
    await db.disconnect();
});

export default handler;