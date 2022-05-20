import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import Supermarket from '../../../models/supermarket';
import db from '../../../utils/db';
import { signToken } from '../../../utils/auth';

const handler = nc();

handler.post(async (req, res) => {
    await db.connect();
    const newSupermarket = new Supermarket({
        city: req.body.city,
        nationalId: req.body.nationalId,
        phoneNumber: req.body.phoneNumber,
        password: bcrypt.hashSync(req.body.password),
    });
    const supermarket = await newSupermarket.save();
    await db.disconnect();

    const token = signToken(supermarket);
    res.send({
        token,
        _id: supermarket._id,
        city: supermarket.city,
        phoneNumber: supermarket.phoneNumber,
        nationalId: supermarket.nationalId,
    });
});

export default handler;