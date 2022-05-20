import { Row, Col, Typography, Tabs} from "antd";
import React, {useState} from "react";
import {useRouter} from "next/router";
import styles from "./index.module.scss";
import ArrowRight from "../../public/icons/arrowRight.svg";
import Dashboard from "../../public/icons/dashboard.svg";
import List from "../../public/icons/list.svg";
import Exit from "../../public/icons/exit.svg";
import Password from "../../public/icons/password.svg";
import Product from "../../public/icons/product.svg";
import User from "../../public/icons/User.svg";
import Products from "./components/products";
import ChangePassword from "./components/change-password";
const { Title, Text } = Typography;

const Seller = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(router?.query?.activeTab?.toString() || '1')

    // useEffect(()=>{
    //     router.query.activeTab=activeTab;
    //     router.push(router);
    // },[activeTab])
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

                <Tabs.TabPane tab={<span><Dashboard/>داشبورد</span>} key="1">

                </Tabs.TabPane>
                <Tabs.TabPane tab={<span><User/>ویرایش پروفایل</span>} key="2">

                </Tabs.TabPane>
                <Tabs.TabPane tab={<span><List/>لیست سفارشات</span>} key="3">

                </Tabs.TabPane>
                <Tabs.TabPane tab={<span><Product/>محصولات فروشگاه</span>} key="4">
                   <Products/>
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span><Password/>تغییر رمز عبور</span>} key="5">
                    <ChangePassword />

                </Tabs.TabPane>
                <Tabs.TabPane tab={<span><Exit/>خروج</span>} key="6" />
            </Tabs>
    </Col>)
}
export default Seller;

