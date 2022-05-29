import { Col, Row, Input, Typography, Button ,Form} from "antd";
import Link from "next/link";
import styles from "./index.module.scss";
import {useState} from "react";
import {
  EyeInvisibleFilled ,EyeFilled
} from "@ant-design/icons";
import {isNationalId, isRequired} from "../../../../common/miscellaneous/form-rules";

const TabPaneContentSeller = ({activeTab,handleRegisterSeller,setIsButtonClicked}:{activeTab:string; handleRegisterSeller:any;setIsButtonClicked:any;}) => {
  const [passwordShown, setPasswordShown ] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown ] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const toggleRepeatPassword = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  return (
      <Form onFinish={handleRegisterSeller}>
        <Row
            justify="center"
            align="middle"
            className={styles["tab-pane-container"]}
        >
          <Col span={18}>
            <Typography.Title level={4}>عضویت در حیفه‌س</Typography.Title>
            <Form.Item name="validationCode" rules={[isRequired]}>
              <Input placeholder="کد تایید پیامک شده" />
            </Form.Item>
            <Form.Item style={{marginTop: "19px"}} name="nationalId" rules={[isRequired, isNationalId]}>
              <Input  placeholder="کد ملی" />
            </Form.Item>
            <Form.Item name="password" rules={[isRequired]}>
              <Row className={styles["password-container"]}>
                <Input placeholder="رمز عبور" type={passwordShown ? "text" : "password"} id="password"/>
                <i onClick={togglePassword}>{passwordShown ? <EyeInvisibleFilled />:<EyeFilled /> }</i>
              </Row>
            </Form.Item>
            <Form.Item name="confirmPassword" rules={[isRequired]}>
              <Row className={styles["password-container"]}>
                <Input placeholder="تکرار رمز عبور" type={confirmPasswordShown ? "text" : "password"} id="confirmPassword"/>
                <i onClick={toggleRepeatPassword}>{confirmPasswordShown ? <EyeInvisibleFilled />:<EyeFilled /> }</i>
              </Row>
            </Form.Item>
            <Button htmlType="submit" onClick={()=>setIsButtonClicked(true)}>ثبت نام</Button>
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
