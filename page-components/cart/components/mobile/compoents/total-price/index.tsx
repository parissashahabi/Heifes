import React from "react";
import { Col, Divider, Row, Typography } from "antd";
import styles from "./styles/total-price.module.scss";
import { parseAmount } from "../../../../../../common/functions/parse-amount";

type PropType = {
  totalAmount: number;
};

const TotalAmountMobile = (props: PropType) => {
  const { totalAmount } = props;
  const { Text } = Typography;
  return (
    <Row className={styles["sum-box"]}>
      <Col className={styles["price-txt"]}>
        <Text>قیمت کالاها با ارزش افزوده:</Text>
      </Col>
      <Col className={styles["price"]}>
        <Text>{parseAmount(totalAmount)} ریال</Text>
      </Col>
      <Divider className={styles["divider"]} />
      <Col className={styles["sum-cart-txt"]}>
        <Text>جمع سبد خرید:</Text>
      </Col>
      <Col className={styles["sum-cart"]}>
        <Text>{parseAmount(totalAmount)} ریال</Text>
      </Col>
    </Row>
  );
};

export default TotalAmountMobile;
