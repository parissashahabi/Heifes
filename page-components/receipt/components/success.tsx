import { Button, Col, Row, Typography } from "antd";
import success from "./success.module.scss";
const Success = () => {
  return (
    <Col className={success["container"]} span={24}>
      <Col className={success["first-col"]}>
        <Row>
          <Typography>پرداخت شما با موفقیت انجام شد</Typography>
        </Row>
        <Row>
          <Typography>کد پیگیری: {}</Typography>
        </Row>
      </Col>
      
        <Button >دریافت رسید</Button>
      
        <Button>بازگشت به فروشگاه</Button>
     
    </Col>
  );
};
export default Success;
