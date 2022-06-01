import styles from "./index.module.scss";
import axios from 'axios';
import dynamic from 'next/dynamic';
import React, {useContext, useEffect, useState} from "react";
import {getError} from "../../../../utils/error";
import {Divider, message, Typography} from "antd";
import {Store} from "../../../../utils/store";
import { Statistic, Card, Row, Col } from 'antd';
import {TeamOutlined,DollarCircleOutlined, ShoppingOutlined,TagsOutlined} from "@ant-design/icons";
import Chart from "../chart/index";
import convertToJalali from "../../../../common/functions/convert-to-jalali";
import StoreSVG from "../../../../public/icons/store.svg";
import StarRatings from 'react-star-ratings';
import moment from "moment";

const Dashboard = () => {
    const { state } = useContext(Store);
    const [summary, setSummary] = useState(undefined);
    const { userInfo } = state;
    const [supermarketData, setSupermarketData] = useState(undefined);

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

    useEffect(() => {
        setSupermarketData({...userInfo});
    }, [userInfo]);

    return <Col className={styles["container"]}>
        <Row gutter={16}>
            <Col span={8} className={styles["profile"]}>
                    <StoreSVG style={{marginBottom: "20px", width:"100px"}} />
                    <Col style={{display:"inline-grid", justifyItems:"center", width: "80%"}} >
                        <Typography.Text
                            style={{color:"#7E7E7E", fontSize:"16px",
                                fontWeight:"500",marginBottom:"10px", textAlign: "center" }}>
                            {supermarketData?.name ? supermarketData?.name : "فروشگاه شما پس از تکمیل پروفایل، در لیست فروشگاه‌های حیفه‌س نشان داده خواهد شد."}
                        </Typography.Text>
                        <Typography.Text
                            style={{color:"#A0A0A0", fontSize:"14px", marginBottom:"10px"  }}>
                            {supermarketData?.address}
                        </Typography.Text>
                        <Row justify="space-between" style={{width: "100%", marginBottom: "10px"}}>
                            <Typography.Text
                                style={{color:"#7E7E7E",fontSize:"14px" }}>
                                امتیاز فروشگاه شما:
                            </Typography.Text>
                            <Typography.Text
                                style={{color:"rgba(45, 143, 86, 1)", fontSize:"14px" }}>
                                <StarRatings
                                    rating={supermarketData?.ranking}
                                    starRatedColor="#F5AE52"
                                    starEmptyColor={"#1E252B47"}
                                    numberOfStars={5}
                                    starDimension="16px"
                                    starSpacing="1px"
                                />
                            </Typography.Text>
                        </Row>
                        <Divider/>
                        <Row justify="space-between" style={{width: "100%", marginBottom: "10px"}}>
                            <Typography.Text
                                style={{color:"#7E7E7E",fontSize:"14px" }}>
                                ساعات کاری:
                            </Typography.Text>
                            {supermarketData?.workingHours?.from ?  <Typography.Text
                                style={{color:"#8F7293", fontSize:"14px" }}>
                                {moment(supermarketData?.workingHours?.from).format("hh:mm")} تا {moment(supermarketData?.workingHours?.to).format("hh:mm")}
                            </Typography.Text>: <Typography.Text
                                style={{color:"#8F7293", fontSize:"14px" }}>-</Typography.Text>}

                        </Row>
                    </Col >
            </Col>
            <Col span={16} style={{padding:"0 1.6rem"}}>
                <Row justify="space-between" gutter={16} style={{marginBottom:"1.6rem"}}>
                    <Col span={12}>
                        <Card>
                            <Statistic
                                title="میزان فروش"
                                value={summary?.ordersPrice}
                                prefix={<DollarCircleOutlined />}
                                suffix="ریال"
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card>
                            <Statistic
                                title="تعداد سفارشات"
                                value={summary?.ordersCount}
                                prefix={<ShoppingOutlined />}
                            />
                        </Card>
                    </Col>
                </Row>
               <Row justify="space-between" gutter={16}>
                   <Col span={12}>
                       <Card>
                           <Statistic
                               title="تعداد کالاهای موجود"
                               value={summary?.stocksCount}
                               prefix={<TagsOutlined />}
                           />
                       </Card>
                   </Col>
                   <Col span={12}>
                       <Card>
                           <Statistic
                               title="تعداد مشتریان"
                               value={summary?.usersCount}
                               prefix={<TeamOutlined />}
                           />
                       </Card>
                   </Col>
               </Row>

            </Col>
            <Col span={24} style={{paddingTop:"4rem"}}>
                <Typography.Title level={4} style={{color:"#5F5F5F"}}>نمودار فروش روزانه</Typography.Title>
                <Chart labels={summary?.salesData?.map((x) => convertToJalali(x._id))} data={summary?.salesData?.map((x) => x.totalSales)}/>
            </Col>
        </Row>
    </Col>;
};

export default dynamic(() => Promise.resolve(Dashboard), { ssr: false });