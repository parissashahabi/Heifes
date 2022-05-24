import styles from "./index.module.scss";
import { Col, Typography } from "antd";
import {useContext, useEffect} from "react";
import {Store} from "../../../../utils/store";
import Cookies from 'js-cookie';

const VerificationRejected = () => {
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
        <Typography.Text>
            کاربر گرامی، هویت شما به عنوان فعال در بازار مواد غذایی تشخیص داده نشد.
        </Typography.Text>
      </Col>
    </Col>
  );
};
export default VerificationRejected;
