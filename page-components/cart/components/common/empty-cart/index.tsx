import React from "react";
import { Button, Typography, Col } from "antd";
import styles from "./styles/empty-cart.module.scss";
import {useRouter} from "next/router";

const EmptyCart = () => {
    const router = useRouter();
    const { Text } = Typography;
  return (
    <Col className={styles["container"]}>
      <Text className={styles["empty-txt"]}>سبد خرید شما خالی است</Text>
      <Button className={styles["return"]} onClick={()=>router.back()}><a>بازگشت به فروشگاه</a></Button>
    </Col>
  );
};

export default EmptyCart;