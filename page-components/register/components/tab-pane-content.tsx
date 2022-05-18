import { Col, Row, Input, Typography, Button ,Form} from "antd";
import Link from "next/link";
import styles from "./index.module.scss";
import {Dispatch, SetStateAction, useState,useEffect, useContext} from "react";
import TabPaneContentBuyer from "./second-stage/tab-pane-contentBuyer";
import TabPaneContentSeller from "./second-stage/tab-pane-contentSeller";
import Cookies from 'js-cookie';
import axios from 'axios';
import {Store} from "../../../utils/store";
import { useRouter } from 'next/router';
const TabPaneContent = ({ type, activeTab, stage, setStage }: { type: string; activeTab?: string; stage?: string;setStage: Dispatch<SetStateAction<string>>; }) => {
const [phoneNumber, setPhoneNumber] = useState(undefined);
  const handleSubmit = (dto: any) => {
      setStage("2")
      setPhoneNumber(dto);
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
                      <Input placeholder="شماره همراه" />
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

