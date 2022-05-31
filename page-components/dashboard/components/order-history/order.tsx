import {Col, Row, Typography, Button, Modal, Form, Input, message} from "antd";
import styles from "./index.module.scss";
import convertToJalali from "../../../../common/functions/convert-to-jalali";
import {parseAmount} from "../../../../common/functions/parse-amount";
import React, {useContext} from "react";
import {isRequired} from "../../../../common/miscellaneous/form-rules";
import axios from "axios";
import {Store} from "../../../../utils/store";
import StarRatings from 'react-star-ratings';


const Order = ({order, index}:{order: any; index: number;})=>{
    const { state } = useContext(Store);
    const { userInfo } = state;
    const [isConfirmed, setIsConfirmed] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [visible, setVisible] = React.useState(false);
    const [rate, setRate] = React.useState(undefined);
    const [supermarketId, setSupermarketId] = React.useState(undefined);
    const [orderId, setOrderId] = React.useState(undefined);
    const [formRef] = Form.useForm();

    const showModal = (sId: any, oId: any) => {
        setSupermarketId(sId);
        setOrderId(oId)
        setVisible(true);
    };
    const handleOk = () => {
        formRef.validateFields().then(()=>{
            formRef.submit();
            setConfirmLoading(true);
            setTimeout(() => {
                setVisible(false);
                setConfirmLoading(false);
                setRate(0);
                formRef.resetFields();
            }, 2000);

        }).catch((err)=>console.log(err))

    };
    const handleCancel = () => {
        formRef.resetFields();
        setVisible(false);
    };
    const onFinish = async (values) => {
        const query = {
            rate: rate,
            comment: {
                customer: userInfo._id,
                description: values.description,
            }
        }
        try {
            await axios.put(`/api/supermarkets/review/${supermarketId}`,query, { headers: { authorization: `Bearer ${userInfo.token}` } } ).then(async ()=>{
                await axios.put(`/api/orders/update`,{orderId: orderId} ,{ headers: { authorization: `Bearer ${userInfo.token}` } } ).then(()=>{
                    setIsConfirmed(true);
                })
            });
        } catch (err) {
            message.error(err.response?.data ? err.response.data.message : err.message);
        }
    };
    return  <>    <Row
        key={index}
        justify="space-between"
        gutter={5}
        style={{ width: "100%" }}
        className={styles["row-of-table"]}
    >
        <Col flex="40px"> </Col>
        <Col flex="150px">
            <Typography.Text>{order?._id.substring(20,24)}</Typography.Text>
        </Col>
        <Col flex="160px">
            <Typography.Text>
                {convertToJalali(order?.createdAt)}
            </Typography.Text>
        </Col>
        <Col flex="260px">
            <Typography.Text>
                {parseAmount(order?.totalPrice)}
            </Typography.Text>
        </Col>
        <Col flex="130px">
            {order?.trackingCode}
        </Col>
        <Col flex="180px" className={styles["detail"]}>
            {order?.isConfirmed || isConfirmed ? <Button disabled style={{background: "#5CBF8C"}}>ثبت شده</Button> : <Button onClick={()=>showModal(order.supermarketId._id, order?._id)}>ثبت وضعیت</Button>}
        </Col>
    </Row>
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
                <Col span={24}>
                    <Form form={formRef} name="nest-messages" className={styles["form"]} onFinish={onFinish}>
                        <StarRatings
                            rating={rate}
                            starRatedColor="#F5AE52"
                            starEmptyColor={"#1E252B47"}
                            numberOfStars={5}
                            changeRating={(newRate)=> setRate(newRate)}
                            starDimension="16px"
                            starSpacing="1px"
                        />
                        <Form.Item name="description" rules={[isRequired]}>
                            <Input.TextArea placeholder="نظر خود را با ما به اشتراک بگذارید..."/>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Modal>
    </>
}

export default Order;