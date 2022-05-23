import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import Customer from '../../../models/customer';
import db from '../../../utils/db';
import { signToken, isAuth } from '../../../utils/auth';

const handler = nc();
handler.use(isAuth);

handler.put(async (req, res) => {
    await db.connect();
    const customer = await Customer.findById(req.customer._id);
    await db.disconnect();
    if (customer && bcrypt.compareSync(req.body.oldPassword, customer.password)) {
        customer.password = bcrypt.hashSync(req.body.newPassword)
        await customer.save();
        const token = signToken(customer);
        res.send({
            token,
            _id: customer._id,
            name: customer.name,
            city: customer.city,
            balance: customer.balance,
            phoneNumber: customer.phoneNumber,
        });
    } else {
        res.status(401).send({ message: 'عملیات با خطا مواجه شد.' });
    }
});

export default handler;