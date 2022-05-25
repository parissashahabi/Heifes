import {Form, Input, Button, Col, Typography, Row} from 'antd';
import styles from "./index.module.scss";
import {useContext} from "react";
import {Store} from "../../../../utils/store";
import changePassword from "../../../../common/functions/change-password";
import CustomerAvatar from "../../../../public/icons/customerAvatar.svg";


const DashboardPage = () => {
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
            type: "customers",
            formRef: formRef
        };
        changePassword(query);
    };
    return (
        <Row justify={"space-between"}>
            <Col className={styles["profile"]}>
                <Row justify={"center"} style={{margin: "20px", width:"100px"}}>
                    <CustomerAvatar />
                </Row>

            </Col>
            <Col className={styles["order-list"]}>
                <Typography.Title> سفارشات جاری</Typography.Title>
            </Col>
        </Row>
    );
};

export default DashboardPage;