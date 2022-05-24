import nc from 'next-connect';
import Supermarket from '../../../models/supermarket';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
    await db.connect();
    const supermarkets = await Supermarket.find({city: req.query.id});
    await db.disconnect();
    res.send(supermarkets);
});

export default handler;