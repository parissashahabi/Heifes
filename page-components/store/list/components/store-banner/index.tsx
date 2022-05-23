import {Row, Typography} from "antd";
import styles from "./index.module.scss";

const Banner = ({stores}:{ stores?: any[]; }) => {
  return (
    <>
      <Row className={styles["container"]}>
       <Row align="middle">
        <Typography.Title level={5}>لیست فروشگاه‌ها</Typography.Title>

       </Row>
      </Row>
    </>
  );
};

export default Banner;
