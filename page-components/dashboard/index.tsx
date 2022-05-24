import { Row, Col, Typography, Tabs} from "antd";
import React, {useContext, useState} from "react";
import {useRouter} from "next/router";
import styles from "./index.module.scss";
import ArrowRight from "../../public/icons/arrowRight.svg";
import DashboardSvg from "../../public/icons/dashboard.svg";
import List from "../../public/icons/list.svg";
import Exit from "../../public/icons/exit.svg";
import Password from "../../public/icons/password.svg";
import User from "../../public/icons/User.svg";
import ChangePassword from "./components/change-password";
import EditProfile from "./components/edit-profile";
import OrderHistory from "./components/order-history";
import {Store} from "../../utils/store";
import Cookies from 'js-cookie';

const { Title, Text } = Typography;

const Dashboard = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(router?.query?.activeTab?.toString() || '1')
    const { dispatch } = useContext(Store);

    const operations = {
        left: <Title level={5} style={{color:"#707070", fontWeight:"600", fontSize:"18px" }}>منوی کاربری</Title>,
    };
    const genTitle = ()=>{
        switch (activeTab){
            case "1":
                return "داشبورد";
            case "2":
                return "ویرایش پروفایل";
            case "3":
                return "سابقه خرید";
            case "4":
                return "تغییر رمز عبور";

            default: return ;
        }
    }
    const logoutClickHandler = () => {
        dispatch({ type: 'USER_LOGOUT' });
        Cookies.remove('userInfo');
        Cookies.remove('cartItems');
        router.push('/');
    };
    return(
    <Col className={styles["container"]}>
        <Row className={styles["container-header"]}>
            <Col flex="100px"  className={styles["return"]} onClick={()=>router.back()}>
                <ArrowRight/>
                <Text > بازگشت</Text>
            </Col>
            <Col flex="auto" className={styles["title"]} >
                <Title level={5}>{genTitle()}</Title>
            </Col>
        </Row>
            <Tabs tabPosition="left" className={styles["container-content"]} tabBarExtraContent={operations} defaultActiveKey={activeTab}
                  onChange={(activeKey) => {
                      setActiveTab(activeKey);
                  }}>

                <Tabs.TabPane tab={<span><DashboardSvg/>داشبورد</span>} key="1">

                </Tabs.TabPane>
                <Tabs.TabPane tab={<span><User/>ویرایش پروفایل</span>} key="2">
                    <EditProfile/>
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span><List/>سابقه خرید</span>} key="3">
                    <OrderHistory/>
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span><Password/>تغییر رمز عبور</span>} key="4">
                    <ChangePassword />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span onClick={logoutClickHandler}><Exit/>خروج</span>} key="5" />
            </Tabs>
    </Col>)
}
export default Dashboard;

