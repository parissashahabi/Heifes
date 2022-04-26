import { Button, Col, Row, Typography } from "antd";
import success from "./success.module.scss";
import {CheckCircleFilled} from "@ant-design/icons";

const { Text, Title } = Typography;
const Success = () => {
  return (
    <Col className={success["container"]} span={24}>
      <Col className={success["first-col"]}>
        <Row><CheckCircleFilled style={{ fontSize: '80px', color: '#2D8F56' }} /></Row>
        <Row>
          <Title level={4} style={{color: '#2D8F56'}}>پرداخت شما با موفقیت انجام شد</Title>
        </Row>
        <Row>
          <Title level={5} style={{color: '#707070'}}>کد پیگیری: {}</Title>
        </Row>
      </Col>
      
        <Button className={success["btn-receipt"]} >دریافت رسید</Button>
      
        <Button className={success["btn-return"]}>بازگشت به فروشگاه</Button>
     
    </Col>
  );
};
export default Success;
