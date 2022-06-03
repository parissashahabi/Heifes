import nc from 'next-connect';
import Order from '../../../../models/order';
import { isAuth } from '../../../../utils/auth';
import db from '../../../../utils/db';
import { onError } from '../../../../utils/error';

const handler = nc({
    onError,
});
handler.use(isAuth);

handler.put(async (req, res) => {
    await db.connect();
    const order = await Order.findById(req.body.orderId);
    if (order) {
        order.isConfirmed = true;
        await order.save();
        res.status(201).send({ message: 'عملیات با موقفیت انجام شد.' });
        await db.disconnect();
    } else {
        await db.disconnect();
        res.status(404).send({ message: 'سبد خرید یافت نشد.' });
    }
});

export default handler;