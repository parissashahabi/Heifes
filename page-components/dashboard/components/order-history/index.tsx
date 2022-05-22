import styles from "./index.module.scss";
import axios from 'axios';
import dynamic from 'next/dynamic';
import {useContext,useReducer,useEffect} from "react";
import {Store} from "../../../../utils/store";
import {getError} from "../../../../utils/error";
import {Button, Col, Row, Typography, Skeleton} from "antd";
import {parseAmount} from "../../../../common/functions/parse-amount";
import convertToJalali from "../../../../common/functions/convert-to-jalali";

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
                            <Skeleton loading={loading} style={{ marginTop: "2rem" }}>
                    {orders?.map((order: any, index: number) => {
                        return (
                            <Row
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
                                    {order?.isConfirmed ?<Button disabled style={{background: "#5CBF8C"}}>ثبت شده</Button> :<Button>ثبت وضعیت</Button>}
                                </Col>
                            </Row>
                        );
                    })}
                            </Skeleton>
                </Col>
            </Col>
        </Row>
    );
};

export default dynamic(() => Promise.resolve(OrderHistory), { ssr: false });