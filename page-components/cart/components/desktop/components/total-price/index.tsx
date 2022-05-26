import React, {useContext, useState} from "react";
import { Button, Col, Divider, Row, Typography } from "antd";
import { parseAmount } from "../../../../../../common/functions/parse-amount";
import styles from "./styles/total-price.module.scss";
import {Store} from "../../../../../../utils/store";
type PropType = {
  totalAmount: number;
  title: string;
  actionTitle: string;
  action?: () => void;
};

const TotalPrice = (props: PropType) => {
  const { totalAmount, title, actionTitle, action } = props;
  const { Text, Title } = Typography;
  const { state } = useContext(Store);
  const {userInfo} = state;
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const taxPrice = round2(totalAmount * 0.09);
  return (
      <Col className={styles["total"]}>
        <Row style={{ justifyContent: "space-between" }}>
          <Col span={8} className={styles["sum"]}>
            <Title level={5}>{title}</Title>
          </Col>
          <Col span={15}>
            <Divider />
          </Col>
          <Row justify="center">
            <Col span={24}>
              <Row justify="space-between" className={styles["price-txt"]}>
                <Text>قیمت کالاها با ارزش افزوده:</Text>
                <Text>{parseAmount(totalAmount)} ریال</Text>
              </Row>
              <Row justify="space-between" className={styles["price-txt"]}>
                <Text>مالیات:</Text>
                <Text>{parseAmount(taxPrice)} ریال</Text>
              </Row>

              <Row justify="space-between" className={styles["price-txt"]}>
                <Text>موجودی کیف پول:</Text>
                <Text>{parseAmount(userInfo?.balance)} ریال</Text>
              </Row>

              <Divider className={styles["divider"]} />
              <Row  justify="space-between">
                <Text className={styles["sum-cart-txt"]}>جمع سبد خرید:</Text>
                <Text className={styles["sum-cart"]}>{parseAmount(totalAmount + taxPrice)} ریال</Text>
              </Row>

            </Col>
            <Button className={styles["proceed"]} disabled={isButtonClicked} onClick={()=> {
              setIsButtonClicked(true);
              action();
            }}>
              {actionTitle}
            </Button>
          </Row>
        </Row>
      </Col>
  );
};

export default TotalPrice;
