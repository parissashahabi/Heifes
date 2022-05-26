import {Button, Col, Row, Form, message, Empty} from "antd";
import styles from "./index.module.scss";
import AddProductModal from "./add-product-modal/addProductModal";
import React, {useContext, useEffect, useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import FormList from "./form-list";
import axios from "axios";
import {Store} from "../../../../utils/store";

const Products = () => {
    const [productionDate, setProductionDate] = useState<string>();
    const [expirationDate, setExpirationDate] = useState<string>();
    const [listData, setListData] = useState<any[]>([]);
    const [selectedProductId, setSelectedProductId] = useState("");
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [formRef] = Form.useForm();
    const { state } = useContext(Store);
    const { userInfo } = state;

    const onFinish = async (values) => {
        const query = {
            productId: selectedProductId,
            productionDate: productionDate,
            expiryDate: expirationDate,
            price: values.price,
            oldPrice: values.oldPrice,
            countInStock: values.countInStock,
        }

        try {
            await axios.post('/api/stocks/add',query, { headers: { authorization: `Bearer ${userInfo.token}` } } )
                .then(async ()=>{
                const {data} = await axios.get(`/api/stocks/${userInfo._id}`);
                    setListData([...data]);
                    formRef.resetFields();
                });

        } catch (err) {
            message.error(err.response?.data ? err.response.data.message : err.message);
        }
    };
    const [formRefList] = Form.useForm();
    const [visible, setVisible] = React.useState(false);
    const showModal = () => {
        setVisible(true);
    };
    useEffect(()=>{
        const fetchStocks = async () => {
            try{
            const {data} = await axios.get(`/api/stocks/${userInfo._id}`);
            setListData([...data]);
            } catch (err) {
                message.error(err.response?.data ? err.response.data.message : err.message);
            }
        }
        fetchStocks();
    },[])
return  <Col className={styles["container"]}>
    <Row justify="end">
    <Button className={styles["add-product-btn"]} onClick={showModal} icon={<PlusOutlined />}>
        افزودن کالا
    </Button>
    </Row>
    {listData.length ? <Row>
        <FormList
            listData={listData}
            // fetchData={fetchData}
            formRef={formRefList}
            setListData={setListData}
        />
    </Row> :
         <Empty description={<span>اطلاعاتی وجود ندارد</span>} />
   }
    <AddProductModal setVisible={setVisible} visible={visible} formRef={formRef} onFinish={onFinish} expirationDate={expirationDate} setExpirationDate={setExpirationDate} productionDate={productionDate} setProductionDate={setProductionDate} confirmLoading={confirmLoading} setConfirmLoading={setConfirmLoading} setSelectedProductId={setSelectedProductId}/>
</Col>
}
export default Products