import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import Customer from '../../../models/customer';
import db from '../../../utils/db';
import { signToken } from '../../../utils/auth';

const handler = nc();

handler.post(async (req, res) => {
    await db.connect();
    const newCustomer = new Customer({
        city: req.body.city,
        phoneNumber: req.body.phoneNumber,
        password: bcrypt.hashSync(req.body.password),
    });
    const customer = await newCustomer.save();
    await db.disconnect();

    const token = signToken(customer);
    res.send({
        token,
        _id: customer._id,
        city: customer.city,
        phoneNumber: customer.phoneNumber,
        isAdmin: customer.isAdmin,
    });
});

export default handler;