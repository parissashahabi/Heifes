import CartDesktop from "./components/desktop";
import CartMobile from "./components/mobile";
import {useContext} from "react";
import dynamic from 'next/dynamic';
import {Store} from "../../utils/store";
import axios from 'axios';
import { useRouter } from 'next/router';
const Cart = () => {
    const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
    const router = useRouter();
    const updateCartHandler = async (item, quantity) => {
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    };
    const removeItemHandler = (item) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    };
    const checkoutHandler = () => {
        router.push('/receipt?result=success');
    };
  return (
    <div>
      <CartDesktop cartItems={cartItems} updateCartHandler={updateCartHandler} removeItemHandler={removeItemHandler} checkoutHandler={checkoutHandler}/>
      <CartMobile cartItems={cartItems} updateCartHandler={updateCartHandler} removeItemHandler={removeItemHandler} checkoutHandler={checkoutHandler}/>
    </div>
  );
};

export default dynamic(()=>Promise.resolve(Cart),{ssr: false});
