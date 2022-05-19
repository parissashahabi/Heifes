import { Col, Row, Input, Typography, Button ,Form, notification, Space } from "antd";
import Link from "next/link";
import styles from "./index.module.scss";
import {useState} from "react";
import {
    EyeInvisibleFilled ,EyeFilled
} from "@ant-design/icons";
import {useRouter} from "next/router";
const PasswordRecovery = () => {
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
        const openNotificationWithIcon = () => {
            notification.open({
                message: ' رمز عبور شما با موفقیت تغییر کرد',
                className: styles["success-notification"],


            });
        };
        openNotificationWithIcon();
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        const openNotificationWithIcon = () => {
            notification.open({
                message: 'خطا در تغییر رمز عبور',
                className: styles["fail-notification"],

            });
        };
        openNotificationWithIcon();
    };
    const router = useRouter();


    return (
        <Form
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}>
            <Row
                justify="center"
                align="middle"
                className={styles["tab-pane-container"]}
            >
                <Col span={18}>
                    <Typography.Title level={4}>بازیابی رمز عبور</Typography.Title>
                    <Form.Item name="phoneNumber">
                        <Input placeholder="شماره همراه" />
                    </Form.Item>

                    <Form.Item name="password">
                        <Row className={styles["password-container"]}>
                            <Input placeholder="رمز عبور جدید" type={passwordShown ? "text" : "password"}/>
                            <i onClick={togglePassword}>{passwordShown ? <EyeInvisibleFilled />:<EyeFilled /> }</i>
                        </Row>
                    </Form.Item>
                    <Form.Item name="repeatPassword">
                        <Row className={styles["password-container"]}>
                            <Input placeholder="تکرار رمز عبور جدید" type={repeatPasswordShown ? "text" : "password"}/>
                            <i onClick={toggleRepeatPassword}>{repeatPasswordShown ? <EyeInvisibleFilled />:<EyeFilled /> }</i>
                        </Row>
                    </Form.Item>
                    <Form.Item  name="verifyCode">
                        <Row>
                            <Col span={17} style={{marginLeft: "10px"}}>
                                <Input   placeholder="کد تایید پیامک شده" />
                            </Col>
                            <Col span={6}>
                                <Button  >ارسال کد</Button>
                            </Col>
                        </Row>


                    </Form.Item>
                    <Button htmlType="submit" onClick={()=>router.push("/login")} style={{marginTop: "19px"}}>تغییر رمز عبور</Button>
                    <Row style={{marginBottom: "60px",marginTop: "12px"}}>
                        <Typography.Text>
                            حساب کاربری دارید؟
                            <Link href={"/login"}>ورود به حساب کاربری</Link>
                        </Typography.Text>
                    </Row>
                </Col>
            </Row>
        </Form>
    );
};
export default PasswordRecovery;


