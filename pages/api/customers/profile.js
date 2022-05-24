import nc from 'next-connect';
import Customer from '../../../models/customer';
import db from '../../../utils/db';
import { signToken, isAuth } from '../../../utils/auth';

const handler = nc();
handler.use(isAuth);

handler.put(async (req, res) => {
    await db.connect();
    const customer = await Customer.findById(req.customer._id);
    customer.name = req.body.name;
    customer.phoneNumber = req.body.phoneNumber;
    customer.city = req.body.city;

    await customer.save();
    await db.disconnect();

    const token = signToken(customer);
    res.send({
        token,
        _id: customer._id,
        name: customer.name,
        city: customer.city,
        balance: customer.balance,
        phoneNumber: customer.phoneNumber,
        isAdmin: customer.isAdmin,
    });
});

export default handler;