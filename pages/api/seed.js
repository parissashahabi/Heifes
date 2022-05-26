import nc from 'next-connect';
import Product from '../../models/product';
import Customer from '../../models/customer';
import Stock from '../../models/stock';
import db from '../../utils/db';
import data from '../../utils/data';
import Supermarket from "../../models/supermarket";

const handler = nc();

handler.get(async (req, res) => {
    await db.connect();
    await Customer.deleteMany();
    await Customer.insertMany(data.customers);
    await Supermarket.deleteMany();
    await Supermarket.insertMany(data.supermarkets);
    await Product.deleteMany();
    await Product.insertMany(data.products);
    await Stock.deleteMany();
    await Stock.insertMany(data.stocks);
    await db.disconnect();
    res.send({ message: 'seeded successfully' });
});

export default handler;