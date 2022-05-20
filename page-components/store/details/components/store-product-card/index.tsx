import {Button, Card, message, Row, Typography} from "antd";
import styles from "./index.module.scss"
import Info from "../../../../../public/icons/info.svg"
import ProductInfo from "../modal";
import React, {useState, useContext} from "react";
import axios from "axios";
import {Store} from "../../../../../utils/store"
const ProductCard = ({product}:{product: object})=>{
    const { state, dispatch } = useContext(Store);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const addToCartHandler = async () => {
        // @ts-ignore
        const existItem = state.cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        // @ts-ignore
        const { data } = await axios.get(`/api/products/${product._id}`);
        if (data.countInStock < quantity) {
            // TODO change window.alert with antd notification or modal ---> DONE
            message.info('موجودی کالا به اتمام رسیده است.');
            return;
        }
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    };
    return <div className={styles["container"]}>
        <Card
            hoverable
            style={{ width: 290 }}
            cover={
                <img
                    alt="example"
                    // @ts-ignore
                    src={product.image}
                />
            }
            actions={[<Button id="info" icon={<Info/>} onClick={()=>setIsModalVisible(true)}/>,
                <Button id="add-to-card" onClick={addToCartHandler}>افزودن به سبد</Button>
            ]}
            className={styles["card"]}
        >
            {/*@ts-ignore*/}
            <Card.Meta title={product.name} description={
                <Row className={styles["description"]}>
                    <Typography.Text id="price">
                        {/*@ts-ignore*/}
                        {product.price} تومان
                    </Typography.Text>
                    <Typography.Text id="old-price">
                        {/*@ts-ignore*/}
                        {product.oldPrice} تومان
                    </Typography.Text>
                </Row>

            } />
        </Card>
        <ProductInfo isModalVisible={isModalVisible} product={product} handleCancel={handleCancel}/>
    </div>
}
export default ProductCard;