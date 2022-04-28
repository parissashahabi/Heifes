import CartDesktop from "./components/desktop";
// import CartMobile from "./components/mobile";
import { useEffect, useState } from "react";
import { getCartList } from "./components/services";
import { LoadingOutlined } from "@ant-design/icons";
import { Row } from "antd";
import styles from "./index.module.scss";
import useCart from "../../store/cart/index";

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [cartList, setCartList] = useState<any[]>([]);
  const [totalAmount, setTotalAmounts] = useState(0);
  const { setCartItemCount } = useCart((state) => state);
  const [validateModal, setValidateModal] = useState(false);
  useEffect(() => {
    getCartList(setCartList, setLoading, setCartItemCount, setValidateModal);
  }, []);

  useEffect(() => {
    if (cartList.length) {
      let total = 0;
      // test
      cartList.map((item) => {
        total += item.totalPrice;
      });
      setTotalAmounts(total);
    }
  }, [cartList]);

  // if (loading)
  //   return (
  //     <Row justify="center" className={styles["container"]}>
  //       <LoadingOutlined />
  //     </Row>
  //   );

  return (
    <div>
      <CartDesktop
        cartList={cartList}
        setCartList={setCartList}
        totalAmount={totalAmount}
        setCartItemCount={setCartItemCount}
        validateModal={validateModal}
        setValidateModal={setValidateModal}
      />
      {/* <CartMobile
        cartList={cartList}
        setCartList={setCartList}
        totalAmount={totalAmount}
        setCartItemCount={setCartItemCount}
        validateModal={validateModal}
        setValidateModal={setValidateModal}
      /> */}
    </div>
  );
};

export default Cart;
