import React from "react";
import { Button, Col, Divider, Row, Typography } from "antd";
import { parseAmount } from "../../../../../../common/functions/parse-amount";
import styles from "./styles/total-price.module.scss";
import { useRouter } from "next/router";

type PropType = {
  totalAmount: number;
  title: string;
  actionTitle: string;
  action: () => void;
};

const TotalPrice = (props: PropType) => {
  const { totalAmount, title, actionTitle, action } = props;
  const { Text } = Typography;
  const router = useRouter();
  return (
    <Col className={styles["total"]}>
      <Row style={{ justifyContent: "space-between" }}>
        <Col span={8} className={styles["sum"]}>
          {" "}
          <Text>{title}</Text>
        </Col>
        <Col span={15}>
          <Divider />
        </Col>
        <Row
          style={{ width: "100%", justifyContent: "center", marginTop: "1rem" }}
        >
          <Row>
            <Col className={styles["price-txt"]}>
              <Text>قیمت کالاها با ارزش افزوده:</Text>
            </Col>
            <Col className={styles["price"]}>
              {" "}
              <Text>{parseAmount(totalAmount)} ریال</Text>
            </Col>
            <Divider className={styles["divider"]} />
            <Col className={styles["sum-cart-txt"]}>
              {router.query.state === "complete-info" ? (
                <Text>جمع نهایی با مالیات</Text>
              ) : (
                <Text>جمع سبد خرید:</Text>
              )}
            </Col>
            <Col className={styles["sum-cart"]}>
              {" "}
              <Text>{parseAmount(totalAmount)} ریال</Text>
            </Col>
          </Row>
          <Button className={styles["proceed"]} onClick={action}>
            {actionTitle}
            {/* <ArrowLeft /> */}
          </Button>
        </Row>
      </Row>
    </Col>
  );
};

export default TotalPrice;
