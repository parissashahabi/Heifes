import { Col, Row, Input, Typography, Button } from "antd";
import Link from "next/link";
import styles from "./index.module.scss";

const TabPaneContent = ({ type }: { type: string }) => {
  return (
    <>
      <Row
        justify="center"
        align="middle"
        className={styles["tab-pane-container"]}
      >
        <Col>
          <Input placeholder="شماره همراه" />
          <Input placeholder="رمز عبور" type="password" />
          <Row justify="end">
            <Link href="/">رمز عبور خود را فراموش کرده‌اید؟</Link>
          </Row>
          <Button>ورود</Button>
          <Row>
            <Typography.Text>
              حساب کاربری ندارید؟
              <Link href="/">عضویت در حیفه‌س</Link>
            </Typography.Text>
          </Row>
        </Col>
      </Row>
    </>
  );
};
export default TabPaneContent;
