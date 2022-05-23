import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import Supermarket from '../../../models/supermarket';
import db from '../../../utils/db';
import { signToken, isAuth } from '../../../utils/auth';

const handler = nc();
handler.use(isAuth);

handler.put(async (req, res) => {
    await db.connect();
    const supermarket = await Supermarket.findById(req.customer._id);
    await db.disconnect();
    if (supermarket && bcrypt.compareSync(req.body.oldPassword, supermarket.password)) {
        supermarket.password = bcrypt.hashSync(req.body.newPassword)
        await supermarket.save();
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
        });
    } else {
        res.status(401).send({ message: 'عملیات با خطا مواجه شد.' });
    }
});

export default handler;