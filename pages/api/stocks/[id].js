import nc from 'next-connect';
import Stock from '../../../models/stock';
import db from '../../../utils/db';
import mongoose from "mongoose";

const handler = nc();

handler.get(async (req, res) => {
    await db.connect();
    res.status(201).send({ message: 'Test' });
   // Stock.aggregate([
   //      {
   //          $match: {
   //              supermarketId: mongoose.Types.ObjectId(req.query.id),
   //          }
   //      },
   //      {
   //          $lookup: {
   //              from: "products",
   //              localField: "productId",
   //              foreignField: "_id",
   //              as: "product_details_list",
   //          },
   //      },
   //      {
   //          $unwind: "$product_details_list",
   //      }
   //  ]).then((result) => {
   //     res.send(result);
   // }).catch(()=>{
   //     res.status(404).send({ message: 'نتیجه‌ای یافت نشد.' });
   // });
    await db.disconnect();

});

export default handler;