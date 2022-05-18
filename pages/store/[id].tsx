import StoreDetails from "../../page-components/store/details/index";
import db from "../../utils/db";
import Product from "../../models/product";

export default StoreDetails;
export async function getServerSideProps() {
    await db.connect();
    const products = await Product.find({}).lean();
    await db.disconnect();
    return {
        props: {
            products: products.map(db.convertDocToObj),
        },
    };
}