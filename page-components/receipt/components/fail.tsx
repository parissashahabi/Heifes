import { Button, Col, Row, Typography } from "antd";
import fail from "./fail.module.scss";
import {ExclamationCircleFilled} from "@ant-design/icons";

const { Text, Title } = Typography;
const Fail = () => {
  return (
      <Col className={fail["container"]} span={24}>
        <Col className={fail["first-col"]}>
          <Row><ExclamationCircleFilled style={{ fontSize: '80px', color: '#EE5D6C' }} /></Row>
          <Row>
            <Title level={4} style={{color: '#EE5D6C'}}>پرداخت ناموفق بود</Title>
          </Row>
          <Row>
              <Text className={fail["text-report"]}>در صورت کسر از موجودی حساب، وجه مورد نظر طی 72 ساعت آینده به حساب شما باز می‌گردد</Text>
          </Row>
        </Col>

        <Button className={fail["btn-return"]}>بازگشت به فروشگاه</Button>

      </Col>
  );
};
export default Fail;

