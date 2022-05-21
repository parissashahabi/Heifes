import nc from 'next-connect';
import Stock from '../../../models/stock';
import db from '../../../utils/db';
import mongoose from "mongoose";

const handler = nc();

handler.get(async (req, res) => {
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
                supermarketId: mongoose.Types.ObjectId(req.query.id),
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