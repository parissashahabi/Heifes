import { Row } from "antd";
import styles from "./index.module.scss";
import { Tabs } from "antd";
import TabPaneContent from "./components/tab-pane-content";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}
const Login = () => {
  return (
    <>
      <Row justify="center" align="middle" className={styles["container"]}>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="خریدار" key="1">
            <TabPaneContent type="buyer" />
          </TabPane>
          <TabPane tab="فروشنده" key="2">
            <TabPaneContent type="seller" />
          </TabPane>
        </Tabs>
      </Row>
    </>
  );
};
export default Login;
