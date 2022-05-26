import {Button, Col, message, Row, Typography} from "antd";
import success from "./success.module.scss";
import {CheckCircleFilled} from "@ant-design/icons";
import { useRouter } from "next/router";
import { useReactToPrint } from "react-to-print";
import {useContext, useEffect, useRef, useState} from "react";
import PrintReceipt from "./printReceipt";
import axios from "axios";
import {getError} from "../../../utils/error";
import {Store} from "../../../utils/store";
import Cookies from 'js-cookie';

const { Title } = Typography;

const Success = () => {
  const router =useRouter();
  const printRef = useRef();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const {orderId} = router.query;
  const [order, setOrder] = useState(undefined);
  const handlePrint = useReactToPrint({
    content: () => printRef.current || null,
  });
  const logoutClickHandler = () => {
    dispatch({ type: 'USER_LOGOUT' });
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    router.push('/');
  };

  const fetchData = async (orderId) =>{
    try{
      const {data} = await axios.get(`/api/orders/${orderId}`,{
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      setOrder(data);
    } catch (err) {
      message.error(getError(err));
      logoutClickHandler();
    }
  }

  useEffect(()=>{
    fetchData(orderId);
  },[orderId]);

  return (
      <>
    <Col className={success["container"]} span={24}>
      <Col className={success["first-col"]}>
        <Row><CheckCircleFilled style={{ fontSize: '80px', color: '#2D8F56' }} /></Row>
        <Row>
          <Title level={4} style={{color: '#2D8F56'}}>پرداخت شما با موفقیت انجام شد</Title>
        </Row>
        <Row>
          <Title level={5} style={{color: '#707070'}}>کد پیگیری: {order?.trackingCode}</Title>
        </Row>
      </Col>

        <Button className={success["btn-receipt"]} onClick={handlePrint}>دریافت رسید</Button>
        <Button className={success["btn-return"]} onClick={()=>router.push("store/list")}>بازگشت به فروشگاه</Button>

    </Col>
        <div style={{ display: "none" }}>
          <PrintReceipt
              PassRef={printRef}
              order={order}
              userInfo={userInfo}
          />
        </div>
      </>
  );
};
export default Success;
