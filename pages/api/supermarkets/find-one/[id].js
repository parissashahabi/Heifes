import nc from 'next-connect';
import Supermarket from '../../../../models/supermarket';
import db from '../../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
    await db.connect();
    const supermarket = await Supermarket.findById(req.query.id);
    await db.disconnect();
    res.send(supermarket);
});

export default handler;