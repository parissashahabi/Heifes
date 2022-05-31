import nc from 'next-connect';
import Stock from '../../../models/stock';
import { isAuth } from '../../../utils/auth';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
    onError,
});
handler.use(isAuth);

handler.post(async (req, res) => {
    await db.connect();
    const stockExist = await Stock.findOne({productId: req.body.productId, supermarketId: req.customer._id});
if(!stockExist){
    const newStock = new Stock({
        ...req.body,
        supermarketId: req.customer._id,
    });
    const stock = await newStock.save();
    res.status(201).send(stock);
} else{
    await db.disconnect();
    res.status(404).send({ message: 'امکان افزودن این محصول وجود ندارد.' });
}
});

export default handler;