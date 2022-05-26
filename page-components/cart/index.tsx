import CartDesktop from "./components/desktop";
import CartMobile from "./components/mobile";
import {useContext} from "react";
import dynamic from 'next/dynamic';
import {Store} from "../../utils/store";
import axios from 'axios';
import { useRouter } from 'next/router';
import {message} from "antd";
import Cookies from 'js-cookie';
import {getError} from "../../utils/error";

const Cart = () => {
    const { state, dispatch } = useContext(Store);
    const {
        cart: { cartItems },
        userInfo
    } = state;

    const router = useRouter();
    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

    const updateCartHandler = async (item, quantity) => {
        const { data } = await axios.post(`/api/stocks/find-one`, {supermarketId: item?.supermarketId, productId:item?.productId });
        if (data.product_details_list?.countInStock < quantity) {
            message.info('موجودی کالا به اتمام رسیده است.');
            return;
        }
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    };
    const removeItemHandler = (item) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    };
    const checkoutHandler = async () => {
        try {
            const { data } = await axios.post(
                '/api/orders',
                {
                    orderItems: [...cartItems],
                    supermarketId: cartItems[0].supermarketId,
                    itemsPrice: cartItems.reduce((a, c) => a + c.quantity * c.price, 0),
                    taxPrice: round2(cartItems.reduce((a, c) => a + c.quantity * c.price, 0) * 0.09),
                    totalPrice: cartItems.reduce((a, c) => a + c.quantity * c.price, 0) + round2(cartItems.reduce((a, c) => a + c.quantity * c.price, 0) * 0.09),
                },
                {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );
            // await axios.put(
            //     `/api/stocks/update/${initialValues._id}`, query, { headers: { authorization: `Bearer ${userInfo.token}` } }
            // );
            dispatch({ type: 'CART_CLEAR' });
            Cookies.remove('cartItems');
            router.push(`/receipt?result=success&orderId=${data._id}`);
        } catch (err) {
            router.push('/receipt?result=fail');
            message.error(getError(err));
        }

    };
    return (
        <div>
            <CartDesktop cartItems={cartItems} updateCartHandler={updateCartHandler} removeItemHandler={removeItemHandler} checkoutHandler={checkoutHandler}/>
            <CartMobile cartItems={cartItems} updateCartHandler={updateCartHandler} removeItemHandler={removeItemHandler} checkoutHandler={checkoutHandler}/>
        </div>
    );
};

export default dynamic(()=>Promise.resolve(Cart),{ssr: false});
