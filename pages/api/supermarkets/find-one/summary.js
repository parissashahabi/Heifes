import nc from 'next-connect';
import Order from '../../../../models/Order';
import Stock from '../../../../models/stock';
import { isAuth } from '../../../../utils/auth';
import db from '../../../../utils/db';
import { onError } from '../../../../utils/error';
import mongoose from "mongoose";

const handler = nc({
    onError,
});
handler.use(isAuth);

handler.get(async (req, res) => {
    await db.connect();
    const ordersCount = await Order.countDocuments({supermarketId: req.customer._id});
    const stocksCount = await Stock.countDocuments({supermarketId: req.customer._id});
    const usersCount = await Order.countDocuments({supermarketId: req.customer._id}).distinct("customer");
    const ordersPriceGroup = await Order.aggregate([
        {
            $match: {
                supermarketId: mongoose.Types.ObjectId(req.customer._id),
            }
        },
        {
            $group: {
                _id: null,
                sales: { $sum: '$totalPrice' },
            },
        },
    ]);
    const ordersPrice =
        ordersPriceGroup.length > 0 ? ordersPriceGroup[0].sales : 0;
    const salesData = await Order.aggregate([
        {
            $match: {
                supermarketId: mongoose.Types.ObjectId(req.customer._id),
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                totalSales: { $sum: '$totalPrice' },
            },
        },
    ]);
    res.send({ ordersCount, stocksCount, usersCount: usersCount.length , ordersPrice, salesData });
});

export default handler;