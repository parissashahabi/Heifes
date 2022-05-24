import styles from "./index.module.scss";
import { Col, Typography } from "antd";
import {useContext, useEffect} from "react";
import {Store} from "../../../../utils/store";
import Cookies from 'js-cookie';

const AwaitingVerification = () => {
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
        <Typography.Text id="shop-pending-for-confirmation">
            کاربر گرامی، وضعیت ثبت نام شما در انتظار تایید می‌باشد.
        </Typography.Text>
      </Col>
    </Col>
  );
};
export default AwaitingVerification;
