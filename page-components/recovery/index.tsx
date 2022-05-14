import { Row } from "antd";
import styles from "./index.module.scss";
import { Tabs } from "antd";
import TabContent from "./components/tab-content";

const { TabPane } = Tabs;

const PasswordRecovery = () => {


    return (
    <>
      <Row justify="center" align="middle" className={styles["container"]}>
        <Tabs>
          <TabPane>
            <TabContent  />
          </TabPane>

        </Tabs>
      </Row>
    </>
  );
};
export default PasswordRecovery;
