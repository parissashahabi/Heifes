import {Button, Card, Row, Typography} from "antd";
import styles from "./index.module.scss"
import Info from "../../../../../public/icons/info.svg"
const ProductCard = ({product}:{product: object})=>{
    return <div className={styles["container"]}>
        {/*@ts-ignore*/}
        <Card
            hoverable
            style={{ width: 290 }}
            cover={
                <img
                    alt="example"
                    src={product.img}
                />
            }
            actions={[<Button id="info" icon={<Info/>}></Button>,
              <Button id="add-to-card">افزودن به سبد</Button>
            ]}
            className={styles["card"]}
        >
            <Card.Meta title={product.name} description={
                <Row className={styles["description"]}>
                    <Typography.Text id="price">
                        {product.price} تومان
                    </Typography.Text>
                    <Typography.Text id="old-price">
                        {product.oldPrice} تومان
                    </Typography.Text>
                </Row>

            } />
        </Card>
    </div>
}
export default ProductCard;