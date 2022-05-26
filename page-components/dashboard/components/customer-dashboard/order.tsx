import { Col, Typography, Row} from 'antd';
import styles from "./index.module.scss";
import convertToJalali from "../../../../common/functions/convert-to-jalali";


const OrderInfo = ({order}:{order:any}) => {
    return (
        <Row justify={"space-between"} className={styles["order"]}>
            <Col>
                <div style={{    alignItems: "center",
                    display: "flex"}}>
                    <Typography.Text>{order?.supermarketId?.name}
                    </Typography.Text>
                    <Typography.Text style={{color:"#EE5D6C", fontSize:"11px", marginRight: "5px" }}> ({order?.isConfirmed ? "تایید شده": "در انتظار تایید"})
                    </Typography.Text>
                </div>
                <div>
                    <Typography.Text style={{color:"rgba(112, 112, 112, 0.8)", fontSize:"12px" }}>تاریخ: {convertToJalali(order?.createdAt)}</Typography.Text>
                </div>
            </Col>
            <div id="tracking-code">
                <Typography.Text style={{color:"#8F7293" }}>کد پیگیری:
                </Typography.Text>
                <Typography.Text style={{color:"#8F7293" }}> {order?.trackingCode}
                </Typography.Text>
            </div>
        </Row>
    );
};

export default OrderInfo;