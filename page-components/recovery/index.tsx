import { Row } from "antd";
import styles from "./index.module.scss";
import { Tabs } from "antd";
import TabPaneContent from "./components/tab-pane-content";

const { TabPane } = Tabs;

const PasswordRecovery = () => {


    return (
    <>
      <Row justify="center" align="middle" className={styles["container"]}>
        <Tabs>
          <TabPane>
            <TabPaneContent  />
          </TabPane>

        </Tabs>
      </Row>
    </>
  );
};
export default PasswordRecovery;
