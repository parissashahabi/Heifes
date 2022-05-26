import {Col, Image, Modal, Row, Typography, Input} from 'antd';
import styles from "./index.module.scss"
import convertToJalali from "../../../../../common/functions/convert-to-jalali";
const ProductInfo = ({isModalVisible, product, handleCancel}:{isModalVisible: boolean; product: any; handleCancel: any}) => {

    const { TextArea } = Input;
    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
const discountPercentage = round2((product.oldPrice - product.price) / product.oldPrice);
    return (
        <>
            <Modal visible={isModalVisible} className={styles["container"]} width={800} onCancel={handleCancel}>
                <Row gutter={[24, 16]}>
                    <Col span={12}>
                        <Image  // @ts-ignore
                            src={product.product_details_list?.image}/>
                    </Col>
                    <Col span={12} >
                        <Row justify="space-between" align="middle" style={{
                            borderBottom:  "1px solid #707070",
                            paddingBottom: "2px",
                            marginBottom: "15px"
                        }}>
                            <Typography.Title level={4}>
                            {product.product_details_list?.name}
                            </Typography.Title>
                            <Typography.Title level={4} className={styles["discount"]}>
                                {discountPercentage*100}%
                            </Typography.Title>
                        </Row>
                        <Col style={{padding: "10px"}}>
                            <Row justify="space-between">
                                <Typography.Text>تاریخ تولید</Typography.Text>
                                <Typography.Text>{convertToJalali(product.productionDate)}</Typography.Text>
                            </Row>
                            <Row justify="space-between">
                                <Typography.Text>تاریخ انقضا</Typography.Text>
                                <Typography.Text>{convertToJalali(product.expiryDate)}</Typography.Text>
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
                            <TextArea rows={4} disabled value={product.product_details_list?.description}/>
                        </Col>

                    </Col>
                </Row>
            </Modal>
        </>
    );
};

export default ProductInfo;