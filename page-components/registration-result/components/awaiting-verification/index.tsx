import styles from "./index.module.scss";
import { Col, Typography } from "antd";
import { useEffect } from "react";

const AwaitingVerification = () => {
  // useEffect(() => {
  //   clientApi.logOut();
  // }, []);

  return (
    <Col className={styles["container"]}>
      <Col>
        <Typography.Text id="shop-pending-for-confirmation">
            کاربر گرامی، وضعیت ثبت نام شما در انتظار تایید می‌باشد.
        </Typography.Text>
      </Col>
    </Col>
  );
};
export default AwaitingVerification;
