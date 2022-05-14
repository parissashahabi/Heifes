import {Button, Card, Row, Typography} from "antd";
import styles from "./index.module.scss"
import Info from "../../../../../public/icons/info.svg"
import ProductInfo from "../modal";
import React, {useState} from "react";
const ProductCard = ({product}:{product: object})=>{
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return <div className={styles["container"]}>
        {/*@ts-ignore*/}
        <Card
            hoverable
            style={{ width: 290 }}
            cover={
                <img
                    alt="example"
                    // @ts-ignore
                    src={product.img}
                />
            }
            actions={[<Button id="info" icon={<Info/>} onClick={()=>setIsModalVisible(true)}/>,
              <Button id="add-to-card">افزودن به سبد</Button>
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