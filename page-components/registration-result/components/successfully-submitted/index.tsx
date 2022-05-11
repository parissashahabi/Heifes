import { Col, Typography } from "antd";
import styles from "./index.module.scss";
import { useEffect } from "react";

const SuccessfullySubmitted = () => {
  // useEffect(() => {
  //   clientApi.logOut();
  // }, []);
  return (
    <Col className={styles["container"]}>
      <Col>
        <Typography.Text id="shop-successful-register">
          ثبت نام شما با موفقیت انجام شد.
        </Typography.Text>
        <Typography.Text>
         پس از احراز هویت توسط تیم پشتیبانی می‌توانید وارد پنل خود شوید.
        </Typography.Text>
      </Col>
    </Col>
  );
};

export default SuccessfullySubmitted;
