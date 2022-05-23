import { Form, Input, Button} from 'antd';
import styles from "./index.module.scss";
import changePassword from "../../../../common/functions/change-password";
import {useContext} from "react";
import {Store} from "../../../../utils/store";


const ChangePassword = () => {
    const [formRef] = Form.useForm();
    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;
    const onFinish = (values) => {
    const query = {
            userInfo: userInfo,
            dispatch: dispatch,
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
            confirmNewPassword: values.confirmNewPassword,
            type: "supermarkets",
        formRef: formRef
        };
        changePassword(query);
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
                name="oldPassword">
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
                <Button  htmlType="submit" style={{fontWeight:500}}>
                    تغییر رمز عبور
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ChangePassword;