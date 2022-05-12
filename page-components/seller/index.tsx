import { Row, Col, Typography, Tabs} from "antd";
import React, {useEffect, useState} from "react";
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
                <form>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="Name">نام و نام خانوادگی</label>
                            <input type="text" className="form-control" id="Name" placeholder="محمد سالاری"></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="phoneNumber">شماره همراه</label>
                        <input type="tel" className="form-control" id="phoneNumber" placeholder="09131111111"></input>
                    </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="nationalID">کد ملی</label>
                        <input type="number" className="form-control" id="nationalID" placeholder="2981196529"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">آدرس</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="اصفهان - اصفهان - شیخ صدوق"></input>
                    </div>
                    <div className="form-row">
                        <div className="md-form md-outline">
                            <label htmlFor="inputAddress">ساعات کاری </label>
                            <label htmlFor="default-picker">از</label>
                            <input type="time" id="default-picker" className="form-control" placeholder="Select time"></input>
                            <label htmlFor="default-picker">تا</label>
                            <input type="time" id="default-picker" className="form-control" placeholder="Select time"></input>
                        </div>
                    </div>
                   
                    <button type="submit" className="btn btn-primary">ویرایش پروفایل</button>
                </form>
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span><List/>لیست سفارشات</span>} key="3">

                </Tabs.TabPane>
                <Tabs.TabPane tab={<span><Product/>محصولات فروشگاه</span>} key="4">
                   <Products/>
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span><Password/>تغییر رمز عبور</span>} key="5">

                </Tabs.TabPane>
                <Tabs.TabPane tab={<span><Exit/>خروج</span>} key="6" />
            </Tabs>
    </Col>)
}
export default Seller;

