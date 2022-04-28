import {Modal, Col, Row} from 'antd';
import React from "react";
import UploadPicture from "./uploadPicture";
import ProductInfoForm from "./productInfoForm";
import styles from "./index.module.scss";

const AddProductModal = ({setVisible, visible}) => {

    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Content of the modal');


    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
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
                    <Col span={14}><ProductInfoForm /></Col>
                    <Col span={6} ><UploadPicture /></Col>
                </Row>
            </Modal>

        </>
    );
};

export default AddProductModal;