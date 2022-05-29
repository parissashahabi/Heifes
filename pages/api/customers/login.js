import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import Customer from '../../../models/customer';
import db from '../../../utils/db';
import { signToken } from '../../../utils/auth';
const handler = nc();

handler.post(async (req, res) => {
    await db.connect();
    const customer = await Customer.findOne({ phoneNumber: req.body.phoneNumber });
    await db.disconnect();
    if (customer && bcrypt.compareSync(req.body.password, customer.password)) {
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
    } else {
        res.status(401).send({ message: 'کاربر تایید نشده است.' });
    }
});

export default handler;