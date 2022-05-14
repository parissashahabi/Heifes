import {Modal, Col, Row, Form} from 'antd';
import React, {useState} from "react";
import UploadPicture from "./uploadPicture";
import ProductInfoForm from "./productInfoForm";
import styles from "./index.module.scss";

const AddProductModal = ({setVisible, visible, formRef, setConfirmLoading, confirmLoading, onFinish,expirationDate,setExpirationDate,productionDate,setProductionDate}) => {


    const handleOk = () => {
        formRef.submit();
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
        // formRef.resetFields();
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <>
            <Modal className={styles["modal"]}
                title="افزودن کالا"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okText="ثبت"
                cancelText="انصراف"
                width={600}
            >
                <Row>
                    <Col flex="320px"><ProductInfoForm formRef={formRef} onFinish={onFinish} expirationDate={expirationDate} setExpirationDate={setExpirationDate} productionDate={productionDate} setProductionDate={setProductionDate}/></Col>
                    <Col flex="auto" className={styles["upload-col"]}><UploadPicture  /></Col>
                </Row>
            </Modal>

        </>
    );
};

export default AddProductModal;