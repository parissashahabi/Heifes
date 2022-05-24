import nc from 'next-connect';
import Supermarket from '../../../models/supermarket';
import db from '../../../utils/db';
import { signToken, isAuth } from '../../../utils/auth';

const handler = nc();
handler.use(isAuth);

handler.put(async (req, res) => {
    await db.connect();
    const supermarket = await Supermarket.findById(req.customer._id);
    supermarket.name = req.body.name;
    supermarket.phoneNumber = req.body.phoneNumber;
    supermarket.nationalId = req.body.nationalId;
    supermarket.city = req.body.city;
    supermarket.address = req.body.address;
    supermarket.workingHours = req.body.workingHours;

    await supermarket.save();
    await db.disconnect();

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
});

export default handler;