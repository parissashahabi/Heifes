import { Col, Typography } from "antd";
import styles from "./index.module.scss";
import {useContext, useEffect} from "react";
import {Store} from "../../../../utils/store";
import Cookies from 'js-cookie';

const SuccessfullySubmitted = () => {
    const { dispatch } = useContext(Store);

    const logoutClickHandler = () => {
        dispatch({ type: 'USER_LOGOUT' });
        Cookies.remove('userInfo');
        Cookies.remove('cartItems');
    };

    useEffect(() => {
        logoutClickHandler();
    }, []);

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
