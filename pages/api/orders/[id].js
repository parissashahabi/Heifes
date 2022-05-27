import nc from 'next-connect';
import Order from '../../../models/order';
import db from '../../../utils/db';
import {onError} from "../../../utils/error";
import {isAuth} from "../../../utils/auth";

const handler = nc({
    onError,
});
handler.use(isAuth);

handler.get(async (req, res) => {
    await db.connect();
    const order = await Order.findById(req.query.id).populate('supermarketId', ['name','address','workingHours']);
    await db.disconnect();
    res.send(order);
    // if(req.customer._id == order.customer){
    //     res.send(order);
    // } else{
    //     res.status(404).send({ message: 'کاربر اجازه دسترسی به این اطلاعات را ندارد.' });
    // }
});

export default handler;