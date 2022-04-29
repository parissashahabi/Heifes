import { Row } from "antd";
import styles from "./index.module.scss";
import { Tabs } from "antd";
import TabPaneContent from "./components/tab-pane-content";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

const { TabPane } = Tabs;

const Login = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>(router?.query?.activeTab?.toString() || '1');

  useEffect(()=>{
    router.query.activeTab=activeTab;
    router.push(router);
  },[activeTab])
  return (
    <>
      <Row justify="center" align="middle" className={styles["container"]}>
        <Tabs defaultActiveKey={activeTab}
              onChange={(activeKey) => {
                setActiveTab(activeKey);
              }}>
          <TabPane tab="خریدار" key="1">
            <TabPaneContent type="buyer" activeTab={activeTab}/>
          </TabPane>
          <TabPane tab="فروشنده" key="2">
            <TabPaneContent type="seller" activeTab={activeTab}/>
          </TabPane>
        </Tabs>
      </Row>
    </>
  );
};
export default Login;
