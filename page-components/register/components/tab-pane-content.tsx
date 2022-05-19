import { Col, Row, Input, Typography, Button ,Form,message} from "antd";
import Link from "next/link";
import styles from "./index.module.scss";
import {Dispatch, SetStateAction, useState,useEffect, useContext} from "react";
import TabPaneContentBuyer from "./second-stage/tab-pane-contentBuyer";
import TabPaneContentSeller from "./second-stage/tab-pane-contentSeller";
import Cookies from 'js-cookie';
import axios from 'axios';
import { digitsFaToEn, phoneNumberValidator } from "@persian-tools/persian-tools";
import {Store} from "../../../utils/store";
import { useRouter } from 'next/router';
const TabPaneContent = ({ type, activeTab, stage, setStage }: { type: string; activeTab?: string; stage?: string;setStage: Dispatch<SetStateAction<string>>; }) => {
const [phoneNumber, setPhoneNumber] = useState(undefined);
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const validatePhone = (value: string) => {
        let en = digitsFaToEn(value);
        setPhoneNumber(en);
        if (phoneNumberValidator(en)) {
            setIsPhoneValid(true);
        } else setIsPhoneValid(false);
    };
    const handleSubmit = (dto: any) => {
        if (!isPhoneValid) return message.warn("شماره وارد شده صحیح نیست");
        try {
            setStage("2")
            setPhoneNumber(dto);
            message.success("کد تایید ارسال شد.");
            sessionStorage.setItem("validPhone", phoneNumber);
        } catch (e) {
            message.error("خطا! دوباره تلاش کنید.");
        }
    };
    const router = useRouter();
    const { redirect } = router.query;
    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;
    useEffect(() => {
        if (userInfo) {
            router.push('/');
        }
    }, []);
  return (
      stage === "1" ? <Form onFinish={handleSubmit}>
          <Row
              justify="center"
              align="middle"
              className={styles["tab-pane-container"]}
          >
              <Col span={18}>
                  <Typography.Title level={4}>عضویت در حیفه‌س</Typography.Title>
                  <Form.Item name="phoneNumber">
                      <Input
                          placeholder="شماره همراه"
                         onChange={(e) => validatePhone(e.target.value)}
                         minLength={11}
                         maxLength={11}
                         type="text"/>
                  </Form.Item>
                  <Button htmlType="submit" >ارسال کد</Button>
                  <Row style={{marginBottom: "60px",marginTop: "12px"}}>
                      <Typography.Text>
                          حساب کاربری دارید؟
                          <Link href={`/login?activeTab=${activeTab}`}>ورود به حساب کاربری</Link>
                      </Typography.Text>
                  </Row>
              </Col>
          </Row>
      </Form> : activeTab ==="1" ? <TabPaneContentBuyer activeTab={activeTab} phoneNumber={phoneNumber}/>:<TabPaneContentSeller activeTab={activeTab} phoneNumber={phoneNumber}/>
  );
};
export default TabPaneContent;

