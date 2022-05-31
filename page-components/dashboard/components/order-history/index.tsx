import styles from "./index.module.scss";
import axios from 'axios';
import dynamic from 'next/dynamic';
import React, {useContext,useReducer,useEffect} from "react";
import {Store} from "../../../../utils/store";
import {getError} from "../../../../utils/error";
import {
    Col,
    Row,
    Skeleton,
    Empty,
} from "antd";
import Order from "./order";

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, orders: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            state;
    }
}
const OrderHistory = () => {
    const { state } = useContext(Store);
    const { userInfo } = state;
    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
        loading: true,
        orders: [],
        error: '',
    });
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/orders/history`, {
                    headers: { authorization: `Bearer ${userInfo.token}` },
                });
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        };
        fetchOrders();
    }, []);
    return (
        <Row className={styles["container"]} justify={"start"} style={{ flexWrap: "nowrap" }}>
            <Col style={{ width: "112rem", marginRight: "2rem" }}>
                <Col span={24}>
                    <Row gutter={5} justify="space-between" className={styles["title"]}>
                        <Col flex="20px"> </Col>
                        <Col flex="180px">شناسه سفارش </Col>
                        <Col flex="150px">تاریخ ثبت</Col>
                        <Col flex="240px">مبلغ کل</Col>
                        <Col flex="170px">کد پیگیری</Col>
                        <Col flex="210px">وضعیت سفارش</Col>

                    </Row>
                    {orders?.length? <Skeleton loading={loading} style={{ marginTop: "2rem" }}>
                        {orders?.map((order: any, index: number) => {
                            return (
                               <Order order={order} index={index}/>
                            );
                        })}
                    </Skeleton> : <Empty description={<span>اطلاعاتی وجود ندارد</span>} />
                    }
                </Col>
            </Col>
        </Row>
    );
};

export default dynamic(() => Promise.resolve(OrderHistory), { ssr: false });