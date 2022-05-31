import {Col, Row, Typography, Table} from "antd";
import styles from "./index.module.scss";
import convertToJalali from "../../../../common/functions/convert-to-jalali";
import {parseAmount} from "../../../../common/functions/parse-amount";
import React, {useState} from "react";
import {ColumnsType} from "antd/lib/table/Table";

const Order = ({order, index}:{order: any; index: number;})=>{
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const columns: ColumnsType<any> = [
        {
            title: "نام کالا",
            dataIndex: ["product_details_list","name"],
            width: 300,
            key: "name",
            align: "right",
            render: (name: any) => {
                return <Typography.Text>{name}</Typography.Text>;
            },
        },
        {
            title: "تعداد",
            key: "quantity",
            width: 220,
            dataIndex: "quantity",
            align: "center",
            render: (quantity: any) => {
                return  (
                        <Typography.Text className={styles["name-cell"]}>{quantity}</Typography.Text>
                );
            },
        },
        {
            title: "قیمت (ریال)",
            dataIndex: "price",
            width: 240,
            key: "price",
            align: "center",
            render: (price: any) => {
                return (
                    <Typography.Text className={styles["name-cell"]}>{parseAmount(price)}</Typography.Text>
                );
            },
        },
    ];
    return  <Row
        key={index}
        justify="space-between"
        gutter={5}
        style={{ width: "100%" }}
        className={styles["row-of-table"]}
        onClick={()=>setIsDetailsOpen(!isDetailsOpen)}
    >
        <Col flex="110px">
            <Typography.Text>{order?.trackingCode}</Typography.Text>
        </Col>
        <Col flex="220px" style={{color:"#707070"}}>
            {order?.customer?.name}
        </Col>
        <Col flex="190px">
            <Typography.Text>
                {convertToJalali(order?.createdAt)}
            </Typography.Text>
        </Col>
        <Col flex="180px">
            <Typography.Text>
                {parseAmount(order?.totalPrice)}
            </Typography.Text>
        </Col>
        <Col flex="130px" className={styles["detail"]}>
            {order?.isConfirmed ?
                <span style={{color:"#2D8F56"}}>
                                            تایید شده
                                        </span>
                : <span style={{color:"#F5AE52"}}>در انتظار تایید</span>}
        </Col>
        {isDetailsOpen ? <Row>
            <Col span={24} className={styles["list"]}>
            <Table
                className={styles["item"]}
                pagination={false}
                columns={columns}
                dataSource={order?.orderItems}
            />
                </Col>
        </Row> :null}

    </Row>
}

export default Order;