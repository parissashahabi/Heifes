import styles from "./index.module.scss";
import axios from 'axios';
import dynamic from 'next/dynamic';
import {useContext, useEffect, useState} from "react";
import {getError} from "../../../../utils/error";
import {message} from "antd";
import {Store} from "../../../../utils/store";
import { Statistic, Card, Row, Col } from 'antd';
import {TeamOutlined,DollarCircleOutlined, ShoppingOutlined,TagsOutlined} from "@ant-design/icons";
import Chart from "../chart/index";
import convertToJalali from "../../../../common/functions/convert-to-jalali";

const Dashboard = () => {
    const { state } = useContext(Store);
    const [summary, setSummary] = useState(undefined);
    const { userInfo } = state;
    const fetchData = async () => {
        try {
            const { data } = await axios.get(`/api/supermarkets/find-one/summary`, {
                headers: { authorization: `Bearer ${userInfo.token}` },
            });
            setSummary(data);
        } catch (err) {
            message.error(getError(err));
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return <Col className={styles["container"]}><Row gutter={16}>
        <Col span={6}>
            <Card>
                <Statistic
                    title="میزان فروش"
                    value={summary?.ordersPrice}
                    prefix={<DollarCircleOutlined />}
                    suffix="ریال"
                />
            </Card>
        </Col>
        <Col span={6}>
            <Card>
                <Statistic
                    title="تعداد سفارشات"
                    value={summary?.ordersCount}
                    prefix={<ShoppingOutlined />}
                />
            </Card>
        </Col>
        <Col span={6}>
            <Card>
                <Statistic
                    title="تعداد کالاهای موجود"
                    value={summary?.stocksCount}
                    prefix={<TagsOutlined />}
                />
            </Card>
        </Col>
        <Col span={6}>
            <Card>
                <Statistic
                    title="تعداد مشتریان"
                    value={summary?.usersCount}
                    prefix={<TeamOutlined />}
                />
            </Card>
        </Col>
        <Col span={24}>
            <Chart labels={summary?.salesData?.map((x) => convertToJalali(x._id))} data={summary?.salesData?.map((x) => x.totalSales)}/>
        </Col>
    </Row></Col>;
};

export default dynamic(() => Promise.resolve(Dashboard), { ssr: false });