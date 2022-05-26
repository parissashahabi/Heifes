import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import Supermarket from '../../../models/supermarket';
import db from '../../../utils/db';
import { signToken } from '../../../utils/auth';

const handler = nc();

handler.post(async (req, res) => {
    await db.connect();
    const supermarket = await Supermarket.findOne({ phoneNumber: req.body.phoneNumber });
    await db.disconnect();
    if (supermarket && bcrypt.compareSync(req.body.password, supermarket.password)) {
        const token = signToken(supermarket);
        res.send({
            token,
            _id: supermarket._id,
            name: supermarket.name,
            city: supermarket.city,
            address: supermarket.address,
            phoneNumber: supermarket.phoneNumber,
            nationalId: supermarket.nationalId,
            ranking: supermarket.ranking,
            status: supermarket.status,
            workingHours: supermarket.workingHours,
            comments: supermarket.comments,
            isAdmin: supermarket.isAdmin,
        });
    } else {
        res.status(401).send({ message: 'فروشگاه تایید نشده است.' });
    }
});

export default handler;