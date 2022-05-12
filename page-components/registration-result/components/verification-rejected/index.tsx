import styles from "./index.module.scss";
import { Col, Typography } from "antd";
import { useEffect } from "react";

const VerificationRejected = () => {
  // useEffect(() => {
  //   clientApi.logOut();
  // }, []);
  return (
    <Col className={styles["container"]}>
      <Col>
        <Typography.Text>
            کاربر گرامی، هویت شما به عنوان فعال در بازار مواد غذایی تشخیص داده نشد.
        </Typography.Text>
      </Col>
    </Col>
  );
};
export default VerificationRejected;
