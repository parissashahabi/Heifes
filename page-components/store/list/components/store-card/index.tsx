import {Button, Card, Col, Row, Typography} from "antd";
import styles from "./index.module.scss"
import React, {useState} from "react";
import {StarFilled} from "@ant-design/icons";



const ProductCard = ({store}:{store: any})=>{

    return <div className={styles["container"]}>
        {/*@ts-ignore*/}
        <Card
            hoverable
            style={{ width: 290 }}
            cover={
                <img
                    alt="example"
                    // @ts-ignore
                    src={store?.img}
                />
            }
            actions={[ <Button className={styles["enter-btn"]}>ورود به فروشگاه</Button> ]}
            className={styles["card"]}>
            {/*@ts-ignore*/}
            <Card.Meta
                title={
                <Row style={{width: "100%"}} justify="space-between" >
                        <Typography.Text>{store?.name}</Typography.Text>
                        <Typography.Text style={{color: '#F5AE52'}} >{store?.rate}<StarFilled style={{display: 'inline-flex',
                            color: '#F5AE52'}}/> </Typography.Text>
                </Row>
            }
            description={store.address}/>
        </Card>

    </div>
}
export default ProductCard;

//, address={{store.address}, rate={store.rate}