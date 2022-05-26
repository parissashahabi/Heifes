import nc from 'next-connect';
import Stock from '../../../../models/stock';
import { isAuth } from '../../../../utils/auth';
import db from '../../../../utils/db';
import { onError } from '../../../../utils/error';

const handler = nc({
    onError,
});
handler.use(isAuth);

handler.put(async (req, res) => {
    await db.connect();
    const stock = await Stock.findById(req.query.id);
    if (stock) {
        stock.price = req.body.price;
        stock.countInStock = req.body.countInStock;

        await stock.save();
        await db.disconnect();
        res.send(stock);
    } else {
        await db.disconnect();
        res.status(404).send({ message: 'محصول یافت نشد.' });
    }
});

export default handler;