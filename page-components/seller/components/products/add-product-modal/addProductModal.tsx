import {Modal, Col, Row, Image} from 'antd';
import ProductInfoForm from "./productInfoForm";
import styles from "./index.module.scss";
import {useState} from "react";

const AddProductModal = ({setVisible, visible, formRef, setConfirmLoading, confirmLoading, onFinish,expirationDate,setExpirationDate,productionDate,setProductionDate, setSelectedProductId}) => {
    const [productImageUrl, setProductImageUrl] = useState("");

    const handleOk = () => {
        formRef.validateFields().then(()=>{
            formRef.submit();
            setConfirmLoading(true);
            setTimeout(() => {
                setVisible(false);
                setConfirmLoading(false);
                formRef.resetFields();
            }, 2000);

        }).catch((err)=>console.log(err))

    };

    const handleCancel = () => {
        formRef.resetFields();
        setProductImageUrl("");
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
                    <Col flex="320px">
                        <ProductInfoForm
                            formRef={formRef}
                            onFinish={onFinish}
                            expirationDate={expirationDate}
                            setExpirationDate={setExpirationDate}
                            productionDate={productionDate}
                            setProductionDate={setProductionDate}
                            setSelectedProductId={setSelectedProductId}
                            setProductImageUrl={setProductImageUrl}
                        />
                    </Col>
                    <Col flex="auto" className={styles["upload-col"]}>
                        {productImageUrl ?  <Image
                            src={productImageUrl}
                            width={170}
                            preview={false}
                        />: <Image
                            src={"/images/image-placeholder.png"}
                            width={170}
                            preview={false}
                        />}

                    </Col>
                </Row>
            </Modal>

        </>
    );
};

export default AddProductModal;