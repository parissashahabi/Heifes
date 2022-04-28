import { Row } from "antd";
import styles from "./index.module.scss";
import { Tabs } from "antd";
import TabPaneContent from "./components/tab-pane-content";
import { useRouter } from "next/router";
import {  useState, useEffect } from "react";

const { TabPane } = Tabs;

const Register = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>(router?.query?.activeTab?.toString() || '1');
  const [stage, setStage] = useState<string>(router?.query?.stage?.toString() || '1');
    useEffect(()=>{
      router.query.stage=stage;
        router.query.activeTab=activeTab;
        router.push(router);
    },[activeTab,stage])


    return (
    <>
      <Row justify="center" align="middle" className={styles["container"]}>
        <Tabs defaultActiveKey={activeTab}
              onChange={(activeKey) => {
                setActiveTab(activeKey);
              }} >
          <TabPane tab="خریدار" key="1">
            <TabPaneContent type="buyer" stage={stage} activeTab={activeTab} setStage={setStage}/>
          </TabPane>
          <TabPane tab="فروشنده" key="2">
            <TabPaneContent type="seller" stage={stage} activeTab={activeTab} setStage={setStage}/>
          </TabPane>
        </Tabs>
      </Row>
    </>
  );
};
export default Register;
