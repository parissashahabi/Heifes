import { Col, Row, Input, Typography, Button ,Form} from "antd";
import Link from "next/link";
import styles from "./index.module.scss";
import {Dispatch, SetStateAction} from "react";
import TabPaneContentBuyer from "./second-stage/tab-pane-contentBuyer";
import TabPaneContentSeller from "./second-stage/tab-pane-contentSeller";
import {isMobileNumber, isRequired} from "../../../common/miscellaneous/form-rules";

const TabPaneContent = ({ type, activeTab, stage, setStage,handleRegisterBuyer,handleRegisterSeller,setPhoneNumber,setIsButtonClicked }: { type: string; activeTab?: string; stage?: string;setStage: Dispatch<SetStateAction<string>>; handleRegisterBuyer?:any;handleRegisterSeller?:any; setPhoneNumber:any; setIsButtonClicked:any; }) => {
    const handleSubmit = (dto: any) => {
        setStage("2")
        setPhoneNumber(dto);
    };
    return (
        stage === "1" ? <Form onFinish={handleSubmit}>
            <Row
                justify="center"
                align="middle"
                className={styles["tab-pane-container"]}
            >
                <Col span={18}>
                    <Typography.Title level={4}>عضویت در حیفه‌س</Typography.Title>
                    <Form.Item name="phoneNumber" rules={[isRequired]}>
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
        </Form> : activeTab ==="1" ? <TabPaneContentBuyer activeTab={activeTab} setIsButtonClicked={setIsButtonClicked} handleRegisterBuyer={handleRegisterBuyer}/>:<TabPaneContentSeller activeTab={activeTab} handleRegisterSeller={handleRegisterSeller} setIsButtonClicked={setIsButtonClicked}/>
    );
};
export default TabPaneContent;

