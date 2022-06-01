import nc from 'next-connect';
import Supermarket from '../../../../models/supermarket';
import db from '../../../../utils/db';
import { isAuth } from '../../../../utils/auth';

const handler = nc();
handler.use(isAuth);

handler.put(async (req, res) => {
    await db.connect();
    const supermarket = await Supermarket.findById(req.query.id);
    await db.disconnect();
    if (supermarket) {
        const comments = supermarket.comments;
        comments.push(req.body.comment)
        supermarket.comments = comments;

        const rate = (((comments.length-1) * supermarket.ranking) + req.body.rate) / comments.length;
        supermarket.ranking = rate;
        await supermarket.save();
        res.status(201).send({ message: 'نظر شما با موفقیت ثبت شد.' });

    } else {
        res.status(401).send({ message: 'عملیات با خطا مواجه شد.' });
    }
});

export default handler;