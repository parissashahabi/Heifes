import {Form, Input, Button, Col, Typography, Row} from 'antd';
import styles from "./index.module.scss";
import CustomerAvatar from "../../../../public/icons/customerAvatar.svg";



const OrderInfo = () => {

    return (
        <Row justify={"space-between"} className={styles["order"]}>
            <Col style={{display:"flex"}}>
                <Typography.Text
                    style={{color:"#7E7E7E", fontSize:"16px",
                        fontWeight:"500"}}>
                    date -
                </Typography.Text>
                <Typography.Text
                    style={{color:"#7E7E7E", fontSize:"16px",
                        fontWeight:"500", marginRight:"5px"}}>
                   super market
                </Typography.Text>


            </Col>
            <Col>
                <Typography.Text
                    style={{color:"#EE5D6C", fontSize:"16px",
                        fontWeight:"500" }}>
                    کد پیگیری: ۹۴۵۷۴۵۰
                </Typography.Text>
            </Col>



        </Row>
    );
};

export default OrderInfo;