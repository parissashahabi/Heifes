import { Form, Input, Button, notification} from 'antd';
import styles from "./index.module.scss";


const ChangePassword = () => {
    const [formRef] = Form.useForm();
    const onFinish = (values) => {
        const query = {
            ...values,
        }
        console.log(query);
    };
    const openNotification = () => {
        notification.open({
            message: 'رمز عبور شما با موفقیت تغییر کرد',
            className: styles["success-notification"],
        });
    };
    return (
        <Form
            form={formRef}
            labelCol={{ flex: "150px" }}
            wrapperCol={{ flex: "400px" }}
            colon={false}
            className={styles["form"]}
        onFinish={onFinish}>
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
                name="confirmNewPassword">
                <Input type={"password"}/>
            </Form.Item>

            <Form.Item label=" ">
                <Button  htmlType="submit" onClick={openNotification} style={{fontWeight:500}}>
                    تغییر رمز عبور
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ChangePassword;