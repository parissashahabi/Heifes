import {Button, Col,Row, Form} from "antd";
import styles from "./index.module.scss";
import AddProductModal from "../addProductModal";
import React, {useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import FormList from "./form-list";

const Products = () => {
    const [productionDate, setProductionDate] = useState<string>();
    const [expirationDate, setExpirationDate] = useState<string>();
    const [listData, setListData] = useState<any[]>([]);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [formRef] = Form.useForm();
    const onFinish = (values) => {
        const query = {
            ...values,
            productionDate: productionDate,
            expirationDate: expirationDate
        }
        setListData([...listData, query])
        console.log(query);
    };
    const [formRefList] = Form.useForm();
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
        <FormList
            listData={listData}
            // fetchData={fetchData}
            formRef={formRefList}
            setListData={setListData}
        />
    </Row>
    <AddProductModal setVisible={setVisible} visible={visible} formRef={formRef} onFinish={onFinish} expirationDate={expirationDate} setExpirationDate={setExpirationDate} productionDate={productionDate} setProductionDate={setProductionDate} confirmLoading={confirmLoading} setConfirmLoading={setConfirmLoading}/>
</Col>
}
export default Products