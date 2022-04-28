import {Button, Row, Col, Typography} from "antd";
import React from "react";
import AddProductModal from "./components/addProductModal";
import Link from "next/link";
const { Title } = Typography;
import styles from "./index.module.scss";
import SideMenu from "./components/sideMenu";
import {ArrowRightOutlined} from "@ant-design/icons";


const Seller = () => {
    const [visible, setVisible] = React.useState(false);
    const showModal = () => {
        setVisible(true);
    };
    return(
    <>

        <Row className={styles["container-header"]}>
            <Col flex="100px"  className={styles["return"]}>
                <ArrowRightOutlined />
                <Link  href="/" > بازگشت</Link>
            </Col>
            <Col flex="auto" className={styles["title"]} >
                <Title  level={5} >محصولات فروشگاه</Title>
            </Col>
        </Row>
        <Row className={styles["container"]}>
            <SideMenu />

            <Col flex="auto" className={styles["container-items"]}>
                <Button className={styles["btn"]} onClick={showModal}>
                    + افزودن کالا
                </Button>
                <AddProductModal setVisible={setVisible} visible={visible} />
            </Col>

        </Row>


    </>



    )
}
export default Seller;

