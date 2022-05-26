import { Button, Col, Row, Typography, Affix, Drawer } from "antd";
import styles from "./styles/cart-mobile.module.scss";
import EmptyCart from "../common/empty-cart";
import Link from "next/link";
import { useRouter } from "next/router";
import {parseAmount} from "../../../../common/functions/parse-amount"
import TotalAmountMobile from "../../../../page-components/cart/components/mobile/compoents/total-price";
import Delete from "../../../../public/icons/delete.svg"
import {useEffect, useState} from "react";
const { Text } = Typography;

const CartMobile = ({cartItems, removeItemHandler, updateCartHandler, checkoutHandler}: { cartItems: any[]; removeItemHandler: any; updateCartHandler:any; checkoutHandler:any}) => {
  const router = useRouter();
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(()=>{
    setTotalAmount(cartItems.reduce((a, c) => a + c.quantity * c.price, 0))
  },[cartItems]);
  return (
    <Row className={styles["wrapper"]}>
      {cartItems.length ? <>
        <Row className={styles["container"]}>
          <Row className={styles["header"]}>
            <Button ghost className={styles["back"]}><Link href="/store"><a></a></Link></Button>
            <Text>سبد خرید</Text>
          </Row>
          {cartItems.map((item) => {
            return <Row key={item?.slug} className={styles["item"]}>
              <Row justify={"space-between"} style={{ width: "100%" }}>
                <Col span={20}><Text>{item?.name}</Text></Col>
                <Col className={styles["remove"]}><Delete /></Col>
              </Row>
              <Text className={styles["price"]}>{parseAmount(item?.price)}</Text>
            </Row>;
          })}
          <Button className={styles["add-items"]} onClick={()=>router.back()}><a>+افزودن کالاهای
            دیگر</a></Button>
        </Row>
        <TotalAmountMobile totalAmount={totalAmount} />
        <Affix offsetBottom={0} className={styles["bottom-box"]}>
          <Row className={styles["holder"]}>
            <Col>
              <Button className={styles["proceed"]} onClick={checkoutHandler}>ادامه
                فرایند
                خرید</Button>
            </Col>
            <Col style={{ paddingRight: "1.6rem" }}>
              <Row>
                <Text className={styles["bottom-box-price-txt"]}>مبلغ قبل پرداخت:</Text>
              </Row>
              <Row>
                <Text className={styles["bottom-box-price"]}>{parseAmount(totalAmount)} ریال</Text>
              </Row>
            </Col>
          </Row>
        </Affix>
      </> : <Col className={styles["container"]}>
        <Row className={styles["header"]}>
          <Button ghost className={styles["back"]}><Link href="/store"><a></a></Link></Button>
          <Text>سبد خرید</Text>
        </Row>
        <EmptyCart />
      </Col>}
    </Row>
  );
};

export default CartMobile;
