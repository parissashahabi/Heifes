import React, {useContext, useState} from "react";
import { Button, Col, Divider, Row, Typography } from "antd";
import { parseAmount } from "../../../../../../common/functions/parse-amount";
import styles from "./styles/total-price.module.scss";
import ArrowLeft from "../../../../../../public/icons/arrowLeft.svg";
import {Store} from "../../../../../../utils/store";
type PropType = {
  totalAmount: number;
  title: string;
  actionTitle: string;
  action?: () => void;
};

const TotalPrice = (props: PropType) => {
  const { totalAmount, title, actionTitle, action } = props;
  const { Text } = Typography;
  const { state } = useContext(Store);
  const {userInfo} = state;
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const taxPrice = round2(totalAmount * 0.09);
  return (
      <Col className={styles["total"]}>
        <Row style={{ justifyContent: "space-between" }}>
          <Col span={8} className={styles["sum"]}>
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
                <Text>{parseAmount(totalAmount)} ریال</Text>
              </Col>
              <Col className={styles["price-txt"]}>
                <Text>مالیات:</Text>
              </Col>
              <Col className={styles["price"]}>
                <Text>{parseAmount(taxPrice)} ریال</Text>
              </Col>
              <Col className={styles["price-txt"]}>
                <Text>موجودی کیف پول:</Text>
              </Col>
              <Col className={styles["price"]}>
                <Text>{parseAmount(userInfo?.balance)} ریال</Text>
              </Col>
              <Divider className={styles["divider"]} />
              <Col className={styles["sum-cart-txt"]}>
                <Text>جمع سبد خرید:</Text>
              </Col>
              <Col className={styles["sum-cart"]}>
                <Text>{parseAmount(totalAmount + taxPrice - userInfo?.balance)} ریال</Text>
              </Col>
            </Row>
            <Button className={styles["proceed"]} disabled={isButtonClicked} onClick={()=> {
              setIsButtonClicked(true);
              action();
            }}>
              {actionTitle}
              <ArrowLeft />
            </Button>
          </Row>
        </Row>
      </Col>
  );
};

export default TotalPrice;
