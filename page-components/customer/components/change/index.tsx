import { Form, Input, Button, notification} from 'antd';
import styles from "./index.module.scss";


const ChangePassword = () => {
    const openNotification = () => {
        notification.open({
            message: 'رمز عبور شما با موفقیت تغییر کرد',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };
    return (
        <Form
            labelCol={{ flex: "150px" }}
            wrapperCol={{ flex: "400px" }}
            colon={false}
            className={styles["form"]}>
            <Form.Item
                label="رمز عبور فعلی"
                name="password">
                <Input type={"password"} />
            </Form.Item>

            <Form.Item
                label="رمز عبور جدید"
                name="newPassword">
                <Input type={"password"}/>
            </Form.Item>

            <Form.Item
                label="تکرار رمز عبور جدید"
                name="repeatNewPassword">
                <Input />
            </Form.Item>

            <Form.Item >
                <Button  htmlType="submit" onClick={openNotification}>
                    تغییر رمز عبور
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ChangePassword;