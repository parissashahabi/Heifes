import styles from "./index.module.scss";
import axios from 'axios';
import dynamic from 'next/dynamic';
import {useContext, useEffect, useState} from "react";
import {Store} from "../../../../utils/store";
import {getError} from "../../../../utils/error";
import {Button, Col, Form, Input, notification, Row, Avatar, TimePicker, Select} from "antd";
import StoreIcon from "../../../../public/icons/store.svg";
import Cookies from 'js-cookie';
import Location from "../../../../public/icons/location.svg";
import moment, {Moment} from "moment";
import locale from "antd/lib/date-picker/locale/fa_IR";
import momentJalaali from "jalali-moment";

const {Option} = Select;
const EditProfile = () => {
    const { ostan } = require('iran-cities-json');
    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;
    const [isEditing, setIsEditing] = useState(false);
    const [from, setFrom] = useState(moment(userInfo?.workingHours?.from).format("HH:mm"));
    const [to, setTo] = useState(moment(userInfo?.workingHours?.to).format("HH:mm"));
    const [formRef] = Form.useForm();

    const onFinish = async (values) => {
        const formData = formRef.getFieldsValue(true);

        const workingHoursFrom = new Date(formData.workingHours[0]);
        workingHoursFrom.setHours(formData.workingHours[0]?._d.getHours());
        workingHoursFrom.setMinutes(formData.workingHours[0]?._d.getMinutes());

        const workingHoursTo = new Date(formData.workingHours[1]);
        workingHoursTo.setHours(formData.workingHours[1]?._d.getHours());
        workingHoursTo.setMinutes(formData.workingHours[1]?._d.getMinutes());

        const query = {
            ...values,
            city: typeof(values.city) === "string" ? userInfo?.city : values.city,
            workingHours: {
                from: workingHoursFrom.toISOString(),
                to: workingHoursTo.toISOString(),
            }
        }
        try {
            const { data } = await axios.put(
                '/api/supermarkets/profile',
                query,
                { headers: { authorization: `Bearer ${userInfo?.token}` } }
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

    useEffect(() => {
        setFrom(moment(userInfo?.workingHours?.from).format("HH:mm"));
        setTo(moment(userInfo?.workingHours?.to).format("HH:mm"));
    }, []);

    useEffect(() => {
        formRef.setFieldsValue({
            workingHours: [momentJalaali(from, "HH:mm"), momentJalaali(to, "HH:mm")],
        });
    }, [from, to]);


    const onWorkingHoursChange = (values: [Moment, Moment], formatString: [string, string]) => {
        formRef.setFieldsValue({ workingHours: values });
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
                        label="کد ملی"
                        name="nationalId">
                        <Input disabled={!isEditing}/>
                    </Form.Item>
                    <Form.Item
                        label="شهر"
                        name="city">
                        <Select
                            suffixIcon={<Location/>}
                            disabled={!isEditing}
                            placeholder="شهر خود را انتخاب کنید"
                        >
                            {ostan.map(item => (
                                <Option key={item.id}>{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="آدرس"
                        name="address">
                        <Input disabled={!isEditing}/>
                    </Form.Item>

                    <Form.Item
                        label="ساعات کاری"
                        name="workingHours">
                        <TimePicker.RangePicker disabled={!isEditing} placeholder={["از","تا"]} onChange={onWorkingHoursChange}
                        locale={locale}
                        format="HH:mm"
                        defaultValue={[moment(from, "HH:mm"),moment(to, "HH:mm")]}
                                                allowClear={false}
                        />
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
                <Avatar size={230} icon={<StoreIcon />}/>
            </Col>
        </Row>

    );
};

export default dynamic(() => Promise.resolve(EditProfile), { ssr: false });