import nc from 'next-connect';
import Order from '../../../../models/order';
import { isAuth } from '../../../../utils/auth';
import db from '../../../../utils/db';
import { onError } from '../../../../utils/error';

const handler = nc({
    onError,
});
handler.use(isAuth);

handler.post(async (req, res) => {
    await db.connect();
    const orders = await Order.find({ trackingCode: req.body.query, supermarketId: req.customer._id }).populate('customer', ['name']);
    res.send(orders);
});

export default handler;