import { Col, Row, Input, Typography, Button ,Form} from "antd";
import Link from "next/link";
import styles from "./index.module.scss";
import {useState} from "react";
import {
EyeInvisibleFilled ,EyeFilled
} from "@ant-design/icons";
import {useRouter} from "next/router";
const TabPaneContent = ({ type, activeTab }: { type: string; activeTab:string }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const handleSubmit = (dto: any) => {
   console.log("login data: ",dto)
  };
  const router = useRouter();
  return (
    <Form onFinish={handleSubmit}>
      <Row
        justify="center"
        align="middle"
        className={styles["tab-pane-container"]}
      >
        <Col span={18}>
          <Typography.Title level={4}>ورود به حساب کاربری</Typography.Title>
          <Form.Item name="phoneNumber">
          <Input placeholder="شماره همراه" />
          </Form.Item>
            <Form.Item name="password">
          <Row className={styles["password-container"]}>
            <Input placeholder="رمز عبور" type={passwordShown ? "text" : "password"}/>
            <i onClick={togglePassword}>{passwordShown ? <EyeInvisibleFilled />:<EyeFilled /> }</i>
          </Row>
            </Form.Item>
          <Row justify="end">
            <Link href="/recovery">رمز عبور خود را فراموش کرده‌اید؟</Link>
          </Row>
          <Button htmlType="submit" onClick={()=>{
            if(activeTab === "1") router.push("/store/6546")
            else router.push("/seller")
          }
              }>ورود</Button>
          <Row style={{marginBottom: "60px",marginTop: "12px"}}>
            <Typography.Text>
              حساب کاربری ندارید؟
              <Link href={`/register?activeTab=${activeTab}`}>عضویت در حیفه‌س</Link>
            </Typography.Text>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};
export default TabPaneContent;
