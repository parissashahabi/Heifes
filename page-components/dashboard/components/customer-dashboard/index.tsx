import {Col, Typography, Row, Empty, message} from 'antd';
import styles from "./index.module.scss";
import CustomerAvatar from "../../../../public/icons/customerAvatar.svg";
import OrderInfo from "./order";
import React, {useContext, useEffect, useState} from "react";
import {Store} from "../../../../utils/store";
import {parseAmount} from "../../../../common/functions/parse-amount";
import axios from "axios";
import {getError} from "../../../../utils/error";


const CustomerDashboard = () => {
    const { state } = useContext(Store);
    const { userInfo } = state;
    const [customerData, setCustomerData] = useState(undefined);
    const [orders, setOrders] = useState(undefined);
    const threeDaysAgo: Date = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)


    const fetchOrders = async () => {
        try {
            const { data } = await axios.get(`/api/orders/history`, {
                headers: { authorization: `Bearer ${userInfo.token}` },
            });
            setOrders(data);
        } catch (err) {
            message.error(getError(err))
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        setCustomerData({...userInfo});
    }, [userInfo]);

    useEffect(() => {
        const currentOrders = orders?.filter((order)=> {
            const createdAt = new Date(order?.createdAt);
            return  threeDaysAgo.getTime() < createdAt.getTime();
        });
        setOrders(currentOrders);
    }, [orders]);

    return (
        <Row justify={"space-between"}>
            <Col  className={styles["profile"]}>
                <Row  justify={"center"} >
                    <CustomerAvatar style={{marginBottom: "20px", width:"100px"}} />
                    <Col style={{display:"inline-grid", justifyItems:"center"}} >
                        <Typography.Text
                            style={{color:"#7E7E7E", fontSize:"16px",
                                fontWeight:"500",marginBottom:"10px" }}>
                            {customerData?.name}
                        </Typography.Text>
                        <Typography.Text
                            style={{color:"#A0A0A0", fontSize:"14px", marginBottom:"10px"  }}>
                            {customerData?.phoneNumber}
                        </Typography.Text>
                        <Row justify="space-between" style={{width: "100%", marginBottom: "30px"}}>
                            <Typography.Text
                                style={{color:"#7E7E7E",fontSize:"14px" }}>
                                موجودی:
                            </Typography.Text>
                            <Typography.Text
                                style={{color:"rgba(45, 143, 86, 1)", fontSize:"14px" }}>
                                {parseAmount(customerData?.balance)} ریال
                            </Typography.Text>
                        </Row>
                    </Col >
                </Row>
            </Col>
            <Col className={styles["order-list"]}>
                <Typography.Title
                    level={4} style={{color:"#707070" }}>
                    سفارشات جاری
                </Typography.Title>
                {orders?.length ? orders?.map((order)=> <Row justify={"center"} key={order?._id}>
                    <OrderInfo order={order}/>
                </Row>) : <Empty description={<span>اطلاعاتی وجود ندارد</span>} />}

            </Col>
        </Row>
    );
};

export default CustomerDashboard;