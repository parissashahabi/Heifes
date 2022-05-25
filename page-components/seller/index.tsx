import {Row, Col, Typography, Tabs, message} from "antd";
import React, {useContext, useState,useEffect} from "react";
import {useRouter} from "next/router";
import styles from "./index.module.scss";
import Dashboard from "../../public/icons/dashboard.svg";
import List from "../../public/icons/list.svg";
import Exit from "../../public/icons/exit.svg";
import Password from "../../public/icons/password.svg";
import Product from "../../public/icons/product.svg";
import User from "../../public/icons/User.svg";
import Products from "./components/products";
import ChangePassword from "./components/change-password";
import SupermarketDashboard from "./components/dashboard";
import EditProfile from "./components/edit-profile";
import OrderHistory from "./components/order-history";
import {Store} from "../../utils/store";
import Cookies from 'js-cookie';

const { Title } = Typography;

const Seller = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(router?.query?.activeTab?.toString() || '1')
    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;

    useEffect(() => {
        if(!userInfo?.isAdmin) {
            message.error("اجازه دسترسی به این صفحه برای شما وجود ندارد.");
            logoutClickHandler();
        }
    },[])

    const logoutClickHandler = () => {
        dispatch({ type: 'USER_LOGOUT' });
        Cookies.remove('userInfo');
        Cookies.remove('cartItems');
        router.push('/');
    };
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
                return "لیست سفارشات";
            case "4":
                return "محصولات فروشگاه";
            case "5":
                return "تغییر رمز عبور";
            default: return ;
        }
    }
    return(
    <Col className={styles["container"]}>
        <Row className={styles["container-header"]}>
            <Col flex="auto" className={styles["title"]} >
                <Title level={5}>{genTitle()}</Title>
            </Col>
        </Row>
            <Tabs tabPosition="left" className={styles["container-content"]} tabBarExtraContent={operations} defaultActiveKey={activeTab}
                  onChange={(activeKey) => {
                      setActiveTab(activeKey);
                  }}>

                <Tabs.TabPane tab={<span><Dashboard/>داشبورد</span>} key="1">
                    <SupermarketDashboard />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span><User/>ویرایش پروفایل</span>} key="2">
                    <EditProfile />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span><List/>لیست سفارشات</span>} key="3">
                    <OrderHistory />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span><Product/>محصولات فروشگاه</span>} key="4">
                   <Products/>
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span><Password/>تغییر رمز عبور</span>} key="5">
                    <ChangePassword />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span onClick={logoutClickHandler}><Exit/>خروج</span>} key="6" />
            </Tabs>
    </Col>)
}
export default Seller;

