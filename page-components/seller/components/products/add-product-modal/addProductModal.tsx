import {Modal, Col, Row} from 'antd';
import UploadPicture from "./uploadPicture";
import ProductInfoForm from "./productInfoForm";
import styles from "./index.module.scss";

const AddProductModal = ({setVisible, visible, formRef, setConfirmLoading, confirmLoading, onFinish,expirationDate,setExpirationDate,productionDate,setProductionDate, setSelectedProductId}) => {


    const handleOk = () => {
        console.log("v", formRef.validateFields())
        formRef.validateFields().then(()=>{
            formRef.submit();
            setConfirmLoading(true);
            setTimeout(() => {
                setVisible(false);
                setConfirmLoading(false);
            }, 2000);
            formRef.resetFields();
        }).catch((err)=>console.log(err))

    };

    const handleCancel = () => {
        formRef.resetFields();
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
                    <Col flex="320px"><ProductInfoForm formRef={formRef} onFinish={onFinish} expirationDate={expirationDate} setExpirationDate={setExpirationDate} productionDate={productionDate} setProductionDate={setProductionDate} setSelectedProductId={setSelectedProductId}/></Col>
                    <Col flex="auto" className={styles["upload-col"]}><UploadPicture  /></Col>
                </Row>
            </Modal>

        </>
    );
};

export default AddProductModal;