import { Button, Col, Row, Typography } from "antd";
import success from "./success.module.scss";
import {CheckCircleFilled} from "@ant-design/icons";
import { useRouter } from "next/router";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import PrintReceipt from "./printReceipt";
const { Title } = Typography;
const Success = () => {
  const router =useRouter();
  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current || null,
  });
  return (
      <>
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

        <Button className={success["btn-receipt"]} onClick={handlePrint}>دریافت رسید</Button>

        <Button className={success["btn-return"]} onClick={()=>router.push("store/list")}>بازگشت به فروشگاه</Button>

    </Col>
        <div style={{ display: "none" }}>
          <PrintReceipt
              PassRef={printRef}
          />
        </div>
      </>
  );
};
export default Success;
