import { Col, Row, Input, Typography, Button ,Form} from "antd";
import Link from "next/link";
import styles from "./index.module.scss";
import {useState} from "react";
import {
EyeInvisibleFilled ,EyeFilled
} from "@ant-design/icons";
const TabPaneContentSeller = ({activeTab}:{activeTab:string}) => {
  const [passwordShown, setPasswordShown ] = useState(false);
  const [repeatPasswordShown, setRepeatPasswordShown ] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const toggleRepeatPassword = () => {
    setRepeatPasswordShown(!repeatPasswordShown);
  };
  const handleSubmit = (dto: any) => {
   console.log("login data: ",dto)
  };
  return (
    <Form onFinish={handleSubmit}>
      <Row
        justify="center"
        align="middle"
        className={styles["tab-pane-container"]}
      >
        <Col span={18}>
          <Typography.Title level={4}>عضویت در حیفه‌س</Typography.Title>
          <Form.Item name="verifyCode">
            <Input placeholder="کد تایید پیامک شده" />
          </Form.Item>
          <Form.Item style={{marginTop: "19px"}} name="idCode">
            <Input  placeholder="کد ملی" />
          </Form.Item>
          <Form.Item name="password">
            <Row className={styles["password-container"]}>
              <Input placeholder="رمز عبور" type={passwordShown ? "text" : "password"}/>
              <i onClick={togglePassword}>{passwordShown ? <EyeInvisibleFilled />:<EyeFilled /> }</i>
            </Row>
          </Form.Item>
          <Form.Item name="repeatPassword">
            <Row className={styles["password-container"]}>
              <Input placeholder="تکرار رمز عبور" type={repeatPasswordShown ? "text" : "repeatPassword"}/>
              <i onClick={toggleRepeatPassword}>{repeatPasswordShown ? <EyeInvisibleFilled />:<EyeFilled /> }</i>
            </Row>
          </Form.Item>
          <Button htmlType="submit">ثبت نام</Button>
          <Row style={{marginBottom: "60px",marginTop: "12px"}}>
            <Typography.Text>
              حساب کاربری دارید؟
              <Link href={`/login?activeTab=${activeTab}`}>ورود به حساب کاربری</Link>
            </Typography.Text>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};
export default TabPaneContentSeller;
