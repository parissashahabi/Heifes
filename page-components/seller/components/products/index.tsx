import {Button, Col,Row} from "antd";
import styles from "./index.module.scss";
import AddProductModal from "../addProductModal";
import React from "react";
import {PlusOutlined} from "@ant-design/icons";

const Products = () => {
    const [visible, setVisible] = React.useState(false);
    const showModal = () => {
        setVisible(true);
    };
return  <Col className={styles["container"]}>
    <Row justify="end">
    <Button className={styles["add-product-btn"]} onClick={showModal} icon={<PlusOutlined />}>
        افزودن کالا
    </Button>
    </Row>
    <Row>
        {/*table*/}
    </Row>
    <AddProductModal setVisible={setVisible} visible={visible} />
</Col>
}
export default Products