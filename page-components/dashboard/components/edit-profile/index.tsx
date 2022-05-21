import styles from "./index.module.scss";
import axios from 'axios';
import dynamic from 'next/dynamic';
import {useContext, useEffect, useState} from "react";
import {Store} from "../../../../utils/store";
import {getError} from "../../../../utils/error";
import {Button, Col, Form, Input, notification, Row, Select, Avatar} from "antd";
import Location from "../../../../public/icons/location.svg";
import CustomerAvatar from "../../../../public/icons/customerAvatar.svg";
import Cookies from 'js-cookie';

const { Option } = Select;

const EditProfile = () => {
    const { ostan } = require('iran-cities-json');
    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;
    const [isEditing, setIsEditing] = useState(false);
    const [formRef] = Form.useForm();

    const onFinish = async (values) => {

        const query = {
            ...values,
            city: typeof(values.city) === "string" ? userInfo.city : values.city,
        }
        try {
            const { data } = await axios.put(
                '/api/customers/profile',
                query,
                { headers: { authorization: `Bearer ${userInfo.token}` } }
            );
            dispatch({ type: 'USER_LOGIN', payload: data });
            Cookies.set('userInfo', JSON.stringify(data));
            setIsEditing(!isEditing);
            openNotification("اطلاعات با موفقیت ذخیره شد", "success-notification");
        } catch (err) {
            openNotification(getError(err), "fail-notification");
        }
    };

    useEffect(() => {
        const userCity = ostan.filter(item => {return item.id === userInfo?.city});
        formRef.setFieldsValue({...userInfo, city: userCity[0].name });
    }, []);

    const openNotification = (message, className) => {
        notification.open({
            message: message,
            className: styles[className],
        });
    };

    function handleChange(value) {
        console.log(value)
    }

    return (
        <Row justify="space-between">
            <Col span={16}>
                <Form
                    form={formRef}
                    labelCol={{ flex: "150px" }}
                    wrapperCol={{ flex: "450px" }}
                    colon={false}
                    className={styles["form"]}
                    onFinish={onFinish}>
                    <Form.Item
                        label="نام و نام‌خانوادگی"
                        name="name">
                        <Input disabled={!isEditing}/>
                    </Form.Item>

                    <Form.Item
                        label="شماره همراه"
                        name="phoneNumber">
                        <Input disabled={!isEditing}/>
                    </Form.Item>

                    <Form.Item
                        label="شهر"
                        name="city">
                        <Select
                            suffixIcon={<Location/>}
                            disabled={!isEditing}
                            onChange={handleChange}
                            placeholder="شهر خود را انتخاب کنید"
                        >
                            {ostan.map(item => (
                                <Option key={item.id}>{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label=" ">
                        {!isEditing ? <Button onClick={()=>setIsEditing(!isEditing)} className={styles["edit-btn"]}>
                            ویرایش پروفایل
                        </Button> : <Row justify="space-between">
                            <Button className={styles["cancel-btn"]} onClick={()=> {
                            const userCity = ostan.filter(item => {return item.id === userInfo?.city});
                            formRef.setFieldsValue({...userInfo, city: userCity[0].name });
                            setIsEditing(!isEditing);
                        }}>
                            انصراف
                        </Button>
                            <Button className={styles["submit-btn"]} htmlType="submit">
                                ثبت
                            </Button>
                        </Row>}
                    </Form.Item>
                </Form>
            </Col>
            <Col span={6} style={{direction: "ltr"}}>
                <Avatar size={230} icon={<CustomerAvatar />}/>
            </Col>
        </Row>

    );
};

export default dynamic(() => Promise.resolve(EditProfile), { ssr: false });