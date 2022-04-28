import { Row } from "antd";
import styles from "./index.module.scss";
import { Tabs } from "antd";
import TabPaneContentBuyer from "./components/tab-pane-contentBuyer";
import TabPaneContentSeller from "./components/tab-pane-contentSeller";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}
const RegisterSecondary = () => {
  return (
    <>
      <Row justify="center" align="middle" className={styles["container"]}>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="خریدار" key="1">
            <TabPaneContentBuyer type="buyer" />
          </TabPane>
          <TabPane tab="فروشنده" key="2">
            <TabPaneContentSeller type="seller" />
          </TabPane>
        </Tabs>
      </Row>
    </>
  );
};
export default RegisterSecondary;
