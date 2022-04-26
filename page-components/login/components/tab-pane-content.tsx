import { Col, Row, Input, Typography, Button } from "antd";
import Link from "next/link";
import styles from "./index.module.scss";
import {useState} from "react";
import {
EyeInvisibleFilled ,EyeFilled
} from "@ant-design/icons";
const TabPaneContent = ({ type }: { type: string }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <>
      <Row
        justify="center"
        align="middle"
        className={styles["tab-pane-container"]}
      >
        <Col span={18}>
          <Typography.Title level={4}>ورود به حساب کاربری</Typography.Title>
          <Input placeholder="شماره همراه" />
          <Row className={styles["password-container"]}>
            <Input placeholder="رمز عبور" type={passwordShown ? "text" : "password"}/>
            <i onClick={togglePassword}>{passwordShown ? <EyeInvisibleFilled />:<EyeFilled /> }</i>
          </Row>
          <Row justify="end">
            <Link href="/">رمز عبور خود را فراموش کرده‌اید؟</Link>
          </Row>
          <Button>ورود</Button>
          <Row style={{marginBottom: "60px",marginTop: "12px"}}>
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
