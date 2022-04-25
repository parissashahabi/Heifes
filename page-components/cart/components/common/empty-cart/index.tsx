import React from "react";
import { Button, Typography, Col } from "antd";
import styles from "./styles/empty-cart.module.scss";
import Link from "next/link";

const EmptyCart = () => {
  const { Text } = Typography;
  return (
    <Col className={styles["container"]}>
      <Text className={styles["empty-txt"]}>سبد خرید شما خالی است</Text>
      <Button className={styles["return"]}><Link href='/store'><a>بازگشت به فروشگاه</a></Link></Button>
    </Col>
  );
};

export default EmptyCart;