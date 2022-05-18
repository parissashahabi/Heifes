import {Col, Image, Modal, Row, Typography, Input} from 'antd';
import styles from "./index.module.scss"
const ProductInfo = ({isModalVisible, product, handleCancel}:{isModalVisible: boolean; product: any; handleCancel: any}) => {

    const { TextArea } = Input;

    return (
        <>
            <Modal visible={isModalVisible} className={styles["container"]} width={800} onCancel={handleCancel}>
                <Row gutter={[24, 16]}>
                    <Col span={12}>
                        <Image  // @ts-ignore
                            src={product.image}/>
                    </Col>
                    <Col span={12} >
                        <Row justify="space-between" align="middle" style={{
                            borderBottom:  "1px solid #707070",
                            paddingBottom: "2px",
                            marginBottom: "15px"
                        }}>
                            <Typography.Title level={4}>
                            {product.name}
                            </Typography.Title>
                            <Typography.Title level={4} className={styles["discount"]}>
                                {product.discountPercentage}%
                            </Typography.Title>
                        </Row>
                        <Col style={{padding: "10px"}}>
                            <Row justify="space-between">
                                <Typography.Text>تاریخ تولید</Typography.Text>
                                <Typography.Text>{product.productionDate}</Typography.Text>
                            </Row>
                            <Row justify="space-between">
                                <Typography.Text>تاریخ انقضا</Typography.Text>
                                <Typography.Text>{product.expiryDate}</Typography.Text>
                            </Row>
                            <Row justify="space-between">
                                <Typography.Text>قیمت روی کالا</Typography.Text>
                                <Typography.Text>{product.oldPrice}</Typography.Text>
                            </Row>
                            <Row justify="space-between">
                                <Typography.Text>قیمت حیفه‌س</Typography.Text>
                                <Typography.Text>{product.price}</Typography.Text>
                            </Row>
                            <Row justify="space-between">
                                <Typography.Text>موجودی</Typography.Text>
                                <Typography.Text>{product.countInStock}</Typography.Text>
                            </Row>

                                <Typography.Title level={5} style={{marginTop: "16px", color:"#1E252B7A"}}>توضیحات فروشنده</Typography.Title>
                            <TextArea rows={4} disabled value={product.description}/>
                        </Col>

                    </Col>
                </Row>
            </Modal>
        </>
    );
};

export default ProductInfo;