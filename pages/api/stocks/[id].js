import nc from 'next-connect';
import Stock from '../../../models/stock';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
    await db.connect();
    const stock = await Stock.find({supermarketId: req.query.id}).populate('productId',['name', 'slug','image','description']);
    const newStocks = stock.map((item)=> {
        let obj = JSON.parse(JSON.stringify(item));
        const newProductId = obj.productId._id;
        let newObj =  {...obj, product_details_list: {...obj.productId}}
        delete obj.productId;
        return {...newObj, productId: newProductId}
    })
    await db.disconnect();
    console.log("newStocks", newStocks)
    res.send(newStocks);
    // Stock.aggregate([
    //     {
    //         $lookup: {
    //             from: "products",
    //             localField: "productId",
    //             foreignField: "_id",
    //             as: "product_details_list",
    //         },
    //     },
    //     {
    //         $unwind: "$product_details_list",
    //     },
    //     {
    //         $match: {
    //             supermarketId: mongoose.Types.ObjectId(req.query.id),
    //         }
    //     }
    // ])
    //     .then(async (result) => {
    //         res.send(result);
    //         await db.disconnect();
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });

});

export default handler;