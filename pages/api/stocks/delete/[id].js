import nc from 'next-connect';
import Stock from '../../../../models/stock';
import { isAuth } from '../../../../utils/auth';
import db from '../../../../utils/db';
import { onError } from '../../../../utils/error';

const handler = nc({
    onError,
});
handler.use(isAuth);

handler.delete(async (req, res) => {
    await db.connect();
    const stock = await Stock.findById(req.query.id);
    if (stock) {
        await stock.remove();
        await db.disconnect();
        res.send({ message: 'محصول با موفقیت حذف شد.' });
    } else {
        await db.disconnect();
        res.status(404).send({ message: 'محصول یافت نشد.' });
    }
});

export default handler;